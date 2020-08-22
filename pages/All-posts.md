---
layout: page
title: Blog
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> {{ post.date }}
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
