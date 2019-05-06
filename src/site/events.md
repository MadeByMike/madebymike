---
title: Speaking & Events
layout: layouts/speaking-index.njk
pagination:
  data: events.past
  size: 50 # Optimistic future proofing here!
  alias: events
---

<div class="page">
  <p>I like to share everything I learn and sometimes I give talks about CSS, SVG, Responsive Design and Front-End development in general.</p>

  <p>I also help organise some events. You can find me regularly at our <a href="https://www.meetup.com/codebarSydney/">codebar</a> meet-up or lending my time at various other local tech events in Sydney.</p>

  <p>If you'd like to get in touch about anything regarding events please <a href="mailto:mike@madebymike.com.au">email me</a>.</p>

  <div class="full-width inline-images">
    <img src="/images/mug/mike-is-grey.jpg">
    <img src="/images/mug/mike-is-color.jpg">
    <img src="/images/mug/mike-is-purple.jpg">
  </div>
  <h2>Bio</h2>

  <p>Mike is an independent web developer from Australia. He has worked on some of Australia’s largest sites as well as some of the smallest community sites. He has a strong interest in front end development and particularly responsive design. Mike has written extensively about techniques for responsive typography and SVG. And now he can’t wait to share with you how custom properties might just change everything about how we approach responsive design in CSS.</p>
  <h2>Past Events</h2>
  {% include "event-list.njk" %}
</div>

<div class="pagination-container">
  {% include "pagination.njk" %}
</div>
