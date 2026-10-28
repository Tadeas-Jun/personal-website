---
layout: "post.njk"
title: "Automatic backups on self-hosted Umami analytics via Docker"
description: "A very short post that I didn't find anywhere else on the internet."
date: "2026-02-21"
tags: "article"
categories:
  - software engineering
  - technical guide
---

I was recently setting up [Umami analytics](https://umami.is/) for a client on a VPS, and I wanted to set up automated backups of the data. As far as I can tell, Umami doesn't have an official guide for this, and other guides I found online were either about outdated Umami versions or just recommending you snapshot the entire server to back up Umami. To be clear, you **should** snapshot the entire server regularly, but also doing that just to back up a few database tables is overkill. Thus this short post on how to back up just the data; let's get straight to the point.

I set up Umami using the [official Docker guide](https://umami.is/docs/install#installing-with-docker), and I'm writing this article for `v3.0.3` of the software. On the VPS, I ran the `docker ps` command to find out the name of the database container: `umami-db-1`. Then I ran an SQL dump command into the container via:

```
docker exec -t umami-db-1 pg_dump -U umami --clean --if-exists umami > backup.dump
```

 The username will depend on your `docker-compose.yml` setup, and based on your exact Docker setup, you might require also feeding in a password (from an environmental variable, don't write passwords straight into commands).

After the dump was finished, I checked the `backup.dump` file to see if the dump went well. It seemed all good, so I manually deleted some data from the database and then tried restoring the backup via:

```
docker exec -i umami-db-1 psql -U umami umami < backup.dump
```

After refreshing the Umami website, all the data I deleted was restored!

To be able to automate this, I wrote the `pg_dump` command into a Bash script:

```
#!/usr/bin/env bash

date="$(printf '%(%Y%m%d)T\n' -1)"

(docker exec -t umami-db-1 pg_dump -U umami --clean --if-exists umami > ${date}-umami-backup.dump) && echo "[${date}] Succesfully backed up Umami database."

# Use the following command (manually) to restore a dump
# docker exec -i umami-db-1 psql -U umami umami < backup.dump
```

As you can see, I also noted down what command to use to restore the backups, if it ever comes to that.

Then, in my `/etc/crontab`, I set the script to run daily:

```
15 2	* * *	username	(cd /opt/umami && bash ./backup.sh >> /var/log/umami/backups.log 2>&1)
```

And now I get nightly Umami backups! I have no idea if this is the best way to do this specifically for Umami, but it works, and I hope this tiny guide was helpful!

Note: I wrote this article when I was using Umami `v3.0.3`. I also tested it on Umami `v3.4.1`, and everything worked. I'll edit this line in this article if I find that it broke on later versions and I managed to fix it.

## Update: Deleting old backups
*This section was written on **2026-10-28** using Umami `v3.4.1`.*

About 8 months after I published this article, I found myself setting up automated Umami backups on a different VPS, this time for my own personal projects. Since I have been running Umami for these websites for many years at this point, the database of visits and events is really huge. At some point, I should probably archive some of that old data, but that's a task for another day. For now, I wanted to have my script automatically delete old backups so they wouldn't take up unnecessary space on my VPS.

To do this, I slightly rewrote the backup script. The new version deletes the backup from the day before once a backup is successful.

```
#!/usr/bin/env bash

date="$(date -I)"
backup_dir="/opt/umami/backups"

docker exec -t umami-db-1 pg_dump -U umami --clean --if-exists umami > ${backup_dir}/${date}-umami-backup.dump

if [ "$?" -eq 0 ]
then
	echo "[${date}] Succesfully backed up Umami database."

	if [ -d "${backup_dir}/$(date -I -d "$d - 1 day")-umami-backup.dump" ]
	then
			echo "[${date}] Deleting old backup at ${backup_dir}/$(date -I -d "$d - 1 day")-umami-backup.dump."
			rm -rf "${backup_dir}/$(date -I -d "$d - 1 day")-umami-backup.dump"
	else
			echo "[${date}] Not deleting an old backup, as the directory does not exist."
	fi
else
	echo "[${date}] Failed to back up Umami database!"
fi

# Use the following command (manually) to restore a dump
# docker exec -i umami-db-1 psql -U umami umami < backup.dump
```

This way, only one backup at a time is stored on the production VPS. This allows me to quickly react to any issues that pop up. On a weekly basis, I also pull this backup to my homeserver, where I have much higher storage capacity, and I keep these backups archived for longer.
