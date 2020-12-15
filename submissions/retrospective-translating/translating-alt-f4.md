The beginnings were small. One man, one issue, one language. But with the next issue there were already a dozen people eager to help. Looking desperately for something to do, that wasn't already someone else' job, the suggestion of translations came. With a multinational community there were quickly a few interested translators for some major and minor languages, like german, which I will focus on today. A single person has quite obvious limitations, for example the workload can't be split up, and while reviewing your translation definitely helps with quality, having more eyes look at it provides a far greater value. But multiple people pose interesting challenges of their own. First though I'd like to give you an idea of how much translation we actually do.

[graph, x=*week*, y=*translated text (total characters)*; I'd like to get time of translation publish from GitHub PRs, not week of associated issue; Graph as lines, with either one line for english and one for total translated content, or one for english and one for every other language, or both]

*Description [better one will follow with actual data]: As we started later with the translation, than the blog itself, there was a sudden increase of total translations in most languages at some point. We can see this as a baseline on how much we could comfortably translate in a full week. We'll get back to that later*

[graph, x=issue, y=translators, For this one I think it would be interesting to see how many translators are listed if a translation is published with the release]

*Description: What might sound obvious is actually not true: a single translator **can** translate a full issue by himself, and multiple translators don't always guarantee a translation at release*

[Transition to next section, dunno am uncreative]

### German inefficiency

I want to go into more detail with translating into German, as I think it's a great example for some of the benefits of having multiple people, but also highlights some challenges, that come up with organising the process or translating itself, and, let's be real, I just don't know that much about the other languages.

We started as three, and after ironing out some initial technical hiccups, we were already going with the backlog of the first few issues. But then the first new issue came. For older issues it was fine for a single translator to work on it for however long it took him, but when the deadline is in 24 hours, we need to parallelise the work. Luckily it got apparent pretty soon that individual articles could be provided earlier than the whole issue, and with the added benefit of more available time we already got a split workload. But what do we do with our finished articles? Just sending them into our discord channel without any versioning proved pretty chaotic early on, and our own GitHub repo was on the table, but proved to big of a hassle for those without experience with git. So `_v1` version suffixes it was. with a (mostly) consistent naming scheme, and an [online difference checking tool](https://www.diffchecker.com/), we had everything we wanted from GitHub, but in our Discord channel.

"Great, they know sorted everything, and that's it, no more problems, right?", you might think. Wrong! You might be right with technical issues, those mostly were sorted out indeed. But language isn't just 'right' or 'false', there are way more nuances[?] to it. You might have encountered different spellings in the english language between American, and British (and some others), those often only have one letter changed though, and even if they are to completely different words, a Brit will still understand what a [insert something american here] is. In German, however, there are some many words an Austrian uses everyday, but someone from northern Germany might never have heard them.

Even though regional differences might seem like the biggest troublemaker, what kills us are actually the more subtle quirks, like the fact that we have a formal and a more informal version for 'you', and those sometimes completely change the structure of a sentence. In some settings, it's unambiguous on which form you should use, but especially for a blog, there are great arguments for both sides. (This is also the reason why I don't like dubbing, even big budget films get it wrong all the time, and it just feels soo unnatural when someone "Siezt" a close friend.)

One thing where it pays off to have different people working on the same thing though is synonyms. Or technically 'not-synonyms', because even though some words might have a similar meaning to most people, especially in tech some words sound a bit off, even though they translate to the same english word as the correct one. For scenarios like this it really pays off to have your translation proofread by up to 4 more people, all with other areas of expertise. However this is also were our biggest weekly challenge comes in:

### Heading

Translating takes time. We don't have that. Currently, articles come in at Thursday morning, we start translating at noon or in the afternoon, and have a first translation in the evening. But then someone wants to proofread it. And I can't remember the last time, we didn't have corrections after someone went through a translation. Corrections might not always be better though, even though they were well-meant[?] (we have a German word for that, "verschlimmbessern", *to worsen something by trying to improve it*); thus we now always have the original translator read through the corrections. But you guessed it, that takes time too. If we have a good day, and everyone is available, we are sometimes less than half an hour before release still busy ironing out some hiccups, correcting errors, and fiddling with non-synonyms.

Sometimes these problems, especially the more technical ones, result in in changes for all languages, sometimes even english [maybe reference if touched upon]. For example quotes are where they are now, because we couldn't figure out how to incorporate translations while still keeping the original quote. [I feel like there should be something more, but I don't know what]

### Heading

I want to briefly talk about translating continuous text versus individual strings; in *TheEnemy42* touched upon [translating the game](https://alt-f4.blog/ALTF4-9/#a-story-about-translating-factorio-theenemy42) itself, and while keeping translations as close to the original as possible, while staying within a reasonable length, is an art form of itself, translating alt-f4 in a way that conveys all content, while still being enjoyable to read, is on a completely different level. Both suffer from a similar problem though, which *stringweasel* mentioned [in the very same issue](https://alt-f4.blog/ALTF4-9/#nauvis-archives-factorio-jargon-stringweasel): jargon. A large part of a games jargon is composed of contractions and abbreviations of in-game terms and specific already technical jargon from the real world, which often doesn't translate to other language, or even make sense in them.

[still bad with transitions :/ ]

With how much I've complained about, you might wonder, "Why do we even translate? Is it for the readers?". And while I do translate with hopes of reaching more people, the reality is, we don't:

[graph, maybe a bar chart for readers]

The reality is, at least I translate, because I enjoy it. It's sort of like programming, but instead of confusing flowcharts or messy thoughts in your head, we have an English text, and instead of translating to programming languages, we translate into real ones, which can be frustrating, as coding can be too, but all in all, is a fun puzzle.

But you, dear reader, are one of those people we do reach, and if you want to help us out, it would be great of you could tell your local factorio community about alt-f4, be it translated or not ;)