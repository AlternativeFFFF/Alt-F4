---
layout: page
title: Introducing Alternative Factorio Friday Fan Facts
---

Also known as Alt-F4, this is a weekly follow-on to Factorio's developer blog, the Factorio Friday Facts. It is written and edited entirely by the community, and aims to highlight various creations by the community, be it art, mods, gameplay, or anything else.

{% comment %} 
if you want to see the website http://YPetremann.github.io
{% endcomment %}
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
