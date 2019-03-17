---
title: Hello, I’m Mike Riethmuller
description: A website by Mike Reithmuller
layout: layouts/home.njk
---

{% set writing = collections.writing | reverse %}
{%- set writing = writing.slice(0,5) -%}
{% include "post-list.njk" %}

<div class="pagination-container">
  <div class="card--small">
    <a class="pagination-link pagination-link-older" href="/writing">
      <span>Other stuff I wrote</span>
      <span class="pagination-btn pagination-btn-next">
        {% include "arrow-right.njk" %}
      </span>
    </a>
  </div>
</div>
