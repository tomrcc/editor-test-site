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
fb1_text: V1 inline text
fb1_block: V1 block text
fb2_text: V2 inline text
fb2_block: V2 block text
fb3_text: V3 inline text
fb3_block: V3 block text
fb4_text: V4 inline text
fb4_block: V4 block text
---
