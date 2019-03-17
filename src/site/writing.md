---
title: Writing
layout: layouts/writing-index.njk
pagination:
  data: collections.writing
  size: 5
  alias: writing
  reverse: true
---

{% include "post-list.njk" %}

<div class="pagination-container">
  {% include "pagination.njk" %}
</div>
