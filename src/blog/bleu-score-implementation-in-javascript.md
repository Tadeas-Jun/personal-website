---
layout: "post.njk"
title: "BLEU score implementation in JavaScript"
description: "Rewriting a lot of Python code into JS because seemingly nobody has done it before."
date: "2026-03-03"
tags: "article"
categories:
  - Art Prompts
  - software engineering
  - technical guide
---

Today I was working a bit on [Art Prompts](https://artprompts.app), and I wanted to implement an admin feature that's been on my TODO list for quite a while: checking if I don't happen to have duplicate prompts in the database. Since I've been working on the project for years, from time to time it happened that I screwed something up in a spreadsheet somewhere, or straight up just forgot about a prompt that I came up with years ago, and I ended up inserting two prompts that were very similar to each other.

Obviously for simple literal duplicates, you can always just `prompt1 === prompt2`, but I needed something a bit more elaborate to truly check if any prompts didn't have the same core concepts, even if they were worded slightly differently. Because of this, I looked into the BLEU algorithm, which was originally developed in 2002 to test the quality of machine translation but with slight modifications it can also be used for comparing texts in one language. I didn't manage to find an implementation written in JavaScript, so I ended up combining the theoretical implemention (mostly from Wikipedia) with some Python implementations that I found online and rewriting it in JS. This article is a quick write-up of that process to hopefully prevent the next person trying this having to rewrite Python to JS by hand.

## Important preface
I'm not an NLP engineer, I don't have a lot of experience in Python (implementations in which I've used as my inspiration for this project), and as I mentioned, I'm not even actually using this algorithm for its intended purpose. That is to say, for me what I've coded works, but I make no guarantees that the algorithm is implemented 100% correctly and that it will work for you. If you need this for something important, please double check my work (and let me know if you find any mistakes so I can fix them in this article!).

Also, the algorithm is originally intended to be used with a large corpus, but I'm only using it on individual sentences (most of them pretty short at that). Because of this, I've made a few parameter modifications that I'll mention when relevant.

## My sources
I put together a few different sources for my implementation. The theoretical background and some of the math formulas I took from the [BLEU Wikipedia page](https://en.wikipedia.org/wiki/BLEU), most of the code I rewrote from the Python implementation in Eugen Sławomir Oparin's article on [Every Algorithm](https://every-algorithm.github.io/2024/12/23/bleu.html) with some minor inspiration also taken from [thyeem's gist script](https://gist.github.com/thyeem/84bb24612202bfe0583966c468cf2cdd), I've also read the original [Papineni et al. (2002)](https://aclanthology.org/P02-1040.pdf) article where they first presented the algorithm, and I've looked at some smoothing methods in [Chen and Cherry (2014)](https://aclanthology.org/W14-3346.pdf), but I didn't end up implementing any of those because I've found my results to be good enough for my use-case.

## The algorithm
In this section, I will briefly describe how the algorithm works on the theoretical level. If you only care about the code, you can skip down a bit.

The BLEU algorithm takes in a *candidate* and a list of *references*. It then compares the words and phrases (i.e. n-grams) in the candidate with those in all the references, and calculates a similarity value ranging from 0 to 1. In simplified terms, it looks at words and multi-word (usually 2-4) phrases in the candidate and checks how many of those n-grams are also present in the references. The end result is 0 if there's absolutely no similarity, 1 if the references contain the candidate exactly, and values in between for all the other cases, based on how similar the candidate is to the references.

The algorithm consists of a few steps, which I'll list here and then go into slightly more details below. Code implemtation can be found in the next section. First, a modified precision value is calculated for every *n* value from 1 to a given maximum, usually 4. The precisions are logarithmized and their geometric mean is calculated. Then, a brevity penalty is calculated, and these last two values are multiplied together to return the final BLEU score.

The modified precision value is a number that represents the similarity of the candidate string to the references for a single value of *n*. Usually, it's calculated from values from 1 to 4, as this was found to give the most accurate results. The modified precision value is calculated in several steps. The candidate string is tokenized (i.e. split into lowercase words without any punctuation marks), the n-grams are counted in the candidate (i.e. how many times does each n-gram for the given value of *n* appear in the candidate string), and then the maximum n-gram counts are calculated for all of the reference strings (i.e. how many times does each n-gram appear at most in one of the strings). Then, each count of the n-grams in the candidate string are added to a total value and a clipped value (which ensures the n-gram count doesn't go higher than the max value from the references). The clipped value is divided by the total value for the final precision value.

The brevity penalty is a value that punishes the BLEU scores of overly short candidates (without it, the algorithm tends to prefer short and incorrect results that simply contain some of the words in the references once). The brevity penalty is calculated by finding a reference of the closest length to the length of the candidate, and then, if the candidate is shorter than the reference length, applying the `e^(1 - ref/can)` formula. By multiplying the final geometric mean with this brevity penalty score, we ensure that short telegraphic candidates aren't preferred by the algorithm.

This might all sound very complicated, and to a certain extend it is. If you aren't following exactly, I'd recommend reading the BLEU Wikipedia page (linked above) and reading through the actual code implementation below.

## The implementation
The final function to calculate the BLEU score is as follows. Usually, the `maxN` would default to 4, but for my sentence-based use-case, I've found that it just works better with 3 as the maximum, especially given that some of the prompts I'm running it on are fairly short sentences.

```
/**
 *
 * @param {string} candidate
 * @param {Array<string>} references
 * @param {number} [maxN=3]
 *
 * @returns {number}
 *
 */
export function calculateBLEU(candidate, references, maxN = 3) {

	const candidateLength = tokenize(candidate).length;
	const clippedMaxN = Math.min(maxN, candidateLength);

	const precisions = [];
	for (let n = 1; n <= clippedMaxN; n++) {

		let precisionForN = modifiedPrecision(candidate, references, n);

		if (precisionForN === 0) {
			// To avoid log(0), treat zero precision as a very small number.
			precisionForN = Number.EPSILON;
		}

		precisions.push(precisionForN);

	}

	// Geometric mean for precisions
	const logPrecisions = precisions.map((p) => Math.log(p));
	const precisionSum = logPrecisions.reduce((partialSum, a) => partialSum + a, 0);
	const geometricMean = Math.exp(precisionSum / clippedMaxN)

	const bp = brevityPenalty(candidate, references);

	const bleuScore = bp * geometricMean;

	return bleuScore;

}
```

The tokenize function simply removes everything that isn't relevant and splits a string into words:

```
/**
 * @param {string} text
 * @returns {Array<string>}
 *
 */
function tokenize(text) {

	if (!text || typeof text !== 'string') return [];

	return text
		.toLowerCase()
		?.trim()
		?.replace(/[^0-9a-zA-Z ]+/g, '')
		?.split(' ');

}
```

The modified precision for each *n* value is calculated here:

```
/**
 * @param {string} candidate
 * @param {Array<string>} references
 * @param {number} n
 *
 * @returns {number}
 *
 */
function modifiedPrecision(candidate, references, n) {

	const candidateTokens = tokenize(candidate);
	const candidateCounts = ngramCounts(candidateTokens, n);
	const maxCounts = maxReferencesCounts(references, n);

	let clipped = 0;
	let total = 0;
	Object.keys(candidateCounts).forEach((cc) => {
		total += candidateCounts[cc];
		clipped += Math.min(candidateCounts[cc], (maxCounts[cc] || 0));
	})

	if (total === 0) {
		return 0;
	}

	return clipped / total;

}
```

The precision function also uses these two calculation functions:

```

/**
 * @param {Array<string>} tokens
 * @param {number} n - Length of n-gram
 *
 * @returns {Object<string: number>}
 *
 */
function ngramCounts(tokens, n) {

	const counts = {};
	for (let i = 0; i < tokens.length - n + 1; i++) {
		const ngram = tokens.slice(i, i+n)?.join(' ');
		counts[ngram] = (counts[ngram] || 0) + 1;
	}

	return counts;

}

/**
 * @param {Array<string>} references
 * @param {number} n
 *
 * @returns {Object<string: number>}
 *
 */
function maxReferencesCounts(references, n) {

	const maxCounts = {};
	references.forEach((ref) => {

		const referenceTokens = tokenize(ref);
		const referenceCounts = ngramCounts(referenceTokens, n);

		Object.keys(referenceCounts).forEach((refCountKey) => {
			if (referenceCounts[refCountKey] > (maxCounts[refCountKey] || 0)) {
				maxCounts[refCountKey] = referenceCounts[refCountKey];
			}
		});

	});

	return maxCounts;

}
```

Finally, the brevity penalty is calculated here:

```

/**
 * @param {string} candidate
 * @param {Array<string>} references
 *
 * @returns {number}
 *
 */
function brevityPenalty(candidate, references) {

	const candidateLength = tokenize(candidate).length;
	const referenceLengths = references.map((ref) => tokenize(ref).length);

	// Find the reference length closest to the candidate length
	const referenceLength = referenceLengths.reduce((bestMatch, x) => {
		const bestDiff = Math.abs(bestMatch - candidateLength);
		const currDiff = Math.abs(x - candidateLength);

		if (currDiff < bestDiff) return x;
		if (currDiff === bestDiff && x < bestMatch) return x;

		return bestMatch;

	});

	if (candidateLength >= referenceLength) return 1;

	return Math.exp(1 - (referenceLength / candidateLength));

}
```

The full code can be found on my [GitHub](https://github.com/Tadeas-Jun/bleujs).

I tested this on my database of prompts (by comparing each prompt as a candidate with each individual other prompt as the reference), and with a bit of trial and error figured out that any prompt marked with a score of 0.7 or more should be checked out. After running on the entire database of around 3 000 prompts (for almost 9 minutes), it found 4 prompts that I would consider genuine duplicates (and plenty more that differed by only one word, but were actually different concepts). Going forward, I'm going to implement a helper function in my internal API that will allow me to check for duplicates any time I'm adding a new prompt or editing an older one, so that I don't need to run the algorithm for all prompts at once. When checking only one prompt, it takes less than a second to finish up.

## Conclusion
I hope this implemention was helpful to you if you're trying to implement BLEU in JavaScript, even if just as a starting point to further modify it for your use-case. Let me know if you find any issues or potential improvements with the code, I'll be happy to improve this little tutorial!
