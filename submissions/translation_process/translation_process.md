# A story of translating Factorio

Like most gamers from Denmark I always play games in English and would never even consider switching to my native Danish language. Some PC or smartphone apps might think they should default to the local language and the first thing is always cursing and switching them back to English. The moment I realised that Danish was even an option in Factorio was when I introduced my then 7 year old daughter to the game.

It did not take long to see that the translation was far from finished. Half the game was still in English and the rest was littered with grammatical errors, lacking translations and inconsistencies. Some translations just re-used the English word even though a Danish word exists, probably because the translators were used to the English terms in gaming and I can’t really blame them.

After a while I got curious and started looking into how the translations in Factorio were handled. The official forum has a translation board with a reference to [Crowdin](https://crowdin.com/project/factorio), which is an online translation tool. All translations are done by volunteers and all I had to do was to request access. Crowdin is a nifty tool and the way it works is that everyone can suggest a translation for a given text and users vote for the preferred one. The ones with the most votes get extracted by Wube and make it into the next version. Then we can see the new translations in-game. Lastly a proofreader role exists, that has the ability to approve a given translation overriding the voting process, though usually the highest voted one is chosen.

![Visual represenation of the Crowdin tool](https://i.imgur.com/j0AlBCQ.png)

*This is the Crowdin tool work space. On the left is a list of texts to be translated. At the top is the current selected original text to translated and below that is an input box to enter your translated text. At the bottom are the current suggested translations with their count of votes and a checkmark for the current approved one. On the right are some tabs for comments and as shown defined terms that helps build consistency.*


I started contributing a bit to the translations despite having no real experience in translating and I noticed that all of the previous translators had not been active for several years. A few people had contributed a few words here and there but nothing more. A quite large task lay ahead. The original strings consist of some 25.000+ words and the Danish translations were at around 65% at the time and the approval rate was at a mere 18%.

In Factorio I switched the language to Danish and it was actually really rewarding to see the fruits of my work in-game. I got hooked and started spending hours in evenings and on my daily commute to work translating texts. A lot of it was grunt work and some of it was really head scratching difficult as some English or technical terms do not really exist in Danish.

Another interesting challenge with the translations is that Danish (like German or similar languages) concatenate nouns into longer words (e.g. "transport belt" would be "transportbelt"). This can lead to rather long single words pushing the layout of the game in unfavourable ways. I am sure translators for other languages faced similar challenges because of grammar, language structure or the like.

![In-game example 1 of layout gone wrong](https://i.imgur.com/GTSKDFQ.jpg)

![In-game example 2 of layout gone wrong](https://i.imgur.com/DzAZOv5.jpg)

*Two examples of the in-game layout either being pushed to a new line or not being able to show the entire text.*


After many months of on-and-off translating I hit my first goal of 100% translation back in June. That accomplishment felt really good but the work was nowhere complete. I applied to Klonan to become proofreader of the Danish translations and once promoted I had the permissions to rework the previous texts. The final challenge was to look beyond the mere words and make it feel more Danish, the localisation. The work also included making coherency (using the same word for the same entity in different texts), fixing grammar and all the oddities across 25.000+ words and was actually a huge task.

At about the same time Wube was working on the new tutorials (the ones that made it into 1.0) and I used it as a way to get a proper feel of the translation since this was most likely what new players would first experience. Did the Danish texts actually make sense in the context? So I played through the campaign and mini-tutorials multiple times, tabbing out to Crowdin to fix texts as I went along.

At the beginning of August I was finally done, both bars sat at a pleasant 100%. Smiling to myself of a job well done I reloaded the page and suddenly it dropped to 96%... Wube had pushed a batch of new translation texts to Crowdin right as I was done. The audacity! Thankfully it did not take long to get it back to 100%.

This last part is actually a bit interesting as Wube pushes new texts to translate to Crowdin as part of their process to build a new release (not sure of the exact details). This means that new or changed texts have not been translated yet when players get a new version. For 1.0 this meant that the new Spidertron and new crashed spaceship actually have the original English texts in all languages as they were added at release time and it won’t be until 1.1 before it’s fixed even though I translated them in Crowdin on release day.

It also meant that I actually learned that the Spidertron had been added to 1.0 from the translations text rather than the trailer or forums because I saw them first after getting a notification from Crowdin.

After release I continue to find bits and bobs that could use better translations and pop by Crowdin to fix it but I do feel satisfied of a job well done as the game can be played entirely in Danish. I hope that maybe some parents out there can use it to push this gear shaped drug we all share onto their own kids.

Happy gaming!
