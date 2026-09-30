---
_schema: home
title: Editor test site
faq_question: Is this summary text editable?
faq_answer: The answer text.
my_colors: red
button_text: Button labael
resize_test:
  caption: Edit this caption to re-render the component
buttons:
  - label: First button
    url: /posts/
    icon: star
content_blocks:
  - _name: blocks/text
    text: First **text** block.
  - _name: blocks/stats
    heading: Stats with items
    items:
      - value: '42'
        label: Things
      - value: '7'
        label: Other things
  - _name: blocks/text
    text: Second text block (same `_name` as the first).
  - _name: blocks/stats
    heading: Stats with no items
    items: []
---
