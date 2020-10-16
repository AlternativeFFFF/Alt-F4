## A story about translating Factorio <author>TheEnemy42</author>

Like most gamers from Denmark, I always play games in English and would never even consider switching to my native Danish language. Some PC or smartphone apps might think they should default to the local language, which always leads to cursing and switching them back to English. The moment I realised that Danish was even an option in Factorio was when I introduced my then seven-year-old daughter to the game.

It did not take long to see that the translation was far from finished. Half the game was still in English and the rest was littered with grammatical errors, dubious translations, and inconsistencies. Some of them just re-used the English word even though a Danish word exists, probably because the translators were so used to the English terms in gaming, which I can’t really blame them for.

After a while, I got curious and started looking into how the Factorio team handled translation. The [official forum](https://forums.factorio.com/) has [a translations board](https://forums.factorio.com/viewforum.php?f=12) with a reference to [Crowdin](https://crowdin.com/project/factorio), which is an online translation tool. All translations are done by volunteers and all I had to do was request access. Crowdin is a nifty tool and the way it works is that everyone can suggest a translation for a given text and users vote for the preferred one. The ones with the most votes get extracted by Wube and make it into the next version. We can then see the new translations in game. Lastly, a proofreader role exists that has the ability to approve a given translation, thus overriding the voting process, though usually the highest voted one is chosen.

![Visual representation of the Crowdin tool](https://media.alt-f4.blog/ALTF4/9/translation-1.jpg)

*This is the Crowdin workspace. On the left is a list of original texts to be translated. At the top is the currently selected original text to translate, and below that is a textbox to enter your translation. At the bottom are the currently suggested translations with their count of votes and a checkmark showing the currently approved one. On the right are some tabs for comments and some common translated terms to help build consistency.*

I started contributing to the translation despite having no real experience with translating, and I noticed that all of the previous translators had been inactive for several years. A few people had contributed a few words here and there, but nothing more. Quite a large task lay ahead of me, then. The original strings consist of some 25,000+ words and the Danish translation was around 65% complete at the time, while the approval rate was at a mere 18%.

Of course, I switched my game to Danish and it was actually really rewarding to see the fruits of my labour in game. I got hooked and started spending hours translating in the evening and on my daily commute to work. A lot of it was grunt work and some of it was head-scratchingly difficult as some English or technical terms do not really exist in Danish.

Another interesting challenge with the translation is that Danish (like German or similar languages) concatenate nouns into longer words (e.g. _transport belt_ would be _transportbelt_). This can lead to rather long single words pushing the layout of the game in unfavourable ways. I am sure translators for other languages faced similar challenges because of grammar, language structure, and the like.

![In-game example 1 of layout gone wrong](https://media.alt-f4.blog/ALTF4/9/translation-2.jpg)

![In-game example 2 of layout gone wrong](https://media.alt-f4.blog/ALTF4/9/translation-3.jpg)

*Two examples of the in-game layout either being pushed to a new line or being unable to show the entire text.*

After many months of on-and-off translating I hit my first goal of 100% translation back in June. That accomplishment felt really good, but the work was nowhere near done. I applied to become proofreader of the Danish translation and once promoted I had the permissions to rework the previous translations. The final challenge was to look beyond the mere words and make the localisation *feel* more Danish. It also included improving coherency (using the same word for the same entity in different translations) and fixing grammar issues and all the other oddities across 25,000+ words. This was quite a big task, actually.

At about the same time Wube was working on the new tutorials (the ones that made it into 1.0), and I used this as a way to get a proper feel of the translation since this was most likely what new players would first experience. Did the Danish translation actually make sense in context? So I played through the campaign and mini-tutorials multiple times, tabbing out to Crowdin to fix texts as I went along.

At the beginning of August I was finally done, both bars sat at a pleasant 100%. Smiling to myself after a job well done, I reloaded the page and suddenly it dropped to 96%... Wube had pushed a batch of new text to Crowdin right as I was done. The audacity! Thankfully it did not take long to get it back to 100%.

This last part is actually quite interesting as Wube push new text to translate to Crowdin as part of their process to build a new release (not sure of the exact details). This means that new or changed texts have not been translated yet when players get a new version. For 1.0, this meant that the new spidertron and new crashed spaceship have the original English text in all languages as they were added at release time. It won’t be until 1.1 before it’s fixed even though I translated them in Crowdin on release day.

It also meant that I learned that the spidertron had been added to 1.0 from the translation texts, rather than the trailer or forums, because I saw that first after getting a notification from Crowdin.

Since release I continue to find bits and bobs that could use better translations and pop by Crowdin to fix them, but I do feel a lot of satisfaction about the fact that the game can be played entirely in Danish. I hope that maybe some parents out there can use it to push this gear-shaped drug onto their own kids.
