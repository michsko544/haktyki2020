const library = [
  'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1S6AixYiLXs1A8N7FeneBefw_6xm5x09lAOFVxW4StTMyfnC7MtTzDVeng_fa9eARzamZAZaJOyxO5g&usqp=CAU',
  'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2020/04/22/coronavirus-and-obesity-doctors-take-aim-at-food-industry-over-poor-diets/10933380-3-eng-GB/Coronavirus-and-obesity-Doctors-take-aim-at-food-industry-over-poor-diets_wrbm_large.jpg',
  'https://www.helpguide.org/wp-content/uploads/fast-foods-candy-cookies-pastries-768.jpg',
  'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/Various_Sandwiches_1296x728-header-1296x728.jpg?w=1155&h=1528',
  'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthy-eating-ingredients-1296x728-header.jpg?w=1155&h=1528',
  'https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO-Images-2020/Magazine/05May/CR-Health-Inlinehero-HealthyFastFood-3-20-v2',
  'https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-10131071761-1.jpg',
  'https://ichef.bbci.co.uk/news/1024/cpsprodpb/1335D/production/_112058687_gettyimages-1208790371.jpg',
  'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/Various_Sandwiches_1296x728-header-1296x728.jpg?w=1155&h=1528',
  'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg',
  'https://tfipost.com/wp-content/uploads/2019/08/mcdonalds.jpg',
  'https://cdn.cnn.com/cnnnext/dam/assets/200310103455-mcdonalds-little-mac-and-double-big-mac-exlarge-169.jpg',
  'https://prod-wolt-venue-images-cdn.wolt.com/s/5MsqlBElHHFyFD2S19X8KF1qBBn6QVj13KznsYTsEI4/5d513f548f59da63efc262d8/d77e001312ad223004a1ffad6181fc6f',
  'https://cdn.pizzaportal.pl/content/5bbd7999b0d6edadaa0933ce2a2f5d5f.png',
]

const photos = {
  pictures: [],
}

const randomPhotos = () => {
  console.log('Random')
  
  photos.pictures.length = 0
  for (let i = 0; i < 6; i++) {
    photos.pictures.push({
      id: i + 1,
      url: library[Math.round(Math.random() * (library.length - 1))],
    })
  }

  return photos
}

export const mockPhotos = (mockAdapter) => {
  mockAdapter
    .onGet(`${process.env.REACT_APP_API_URL}/photos`)
    .reply(200, randomPhotos())
}
