import get from 'lodash/get'
export const shapeCard = card => ({
  content: get(card, 'description.childMarkdownRemark.html') || '',
  color: (get(card, 'color') || 'grey').toLowerCase(),
  size: card.size,
  type: card.type,
  url: card.url || `/writing/${card.slug}`,
  title: card.title,
  image: {
    url: get(card, 'image.file.url'),
    alt: get(card, 'image.description'),
  },
  dateString: get(card, 'card.dateString'),
  tags: get(card, 'card.tags'),
  meta: true, // ToDo: flag?
})
