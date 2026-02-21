---
layout: "post.njk"
title: "Automatic backups on self-hosted Umami analytics via Docker"
description: "A very short post that I didn't find anywhere else on the internet."
releaseDate: "23 February 2026"
date: "2026-02-23"
tags: "article"
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

Note: This works for me on Umami v3.0.3. I'll edit this line in this article if I find that it broke on later versions and I managed to fix it.
