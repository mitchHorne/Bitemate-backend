export function formatPostData(postData: any) {
  if (!postData) return null;

  console.log(postData);

  try {
    return {
      authorId: postData.user[0],
      country: postData.countries[0],
      description: postData.description[0],
      difficulty: postData.difficulty[0],
      downVote: 0,
      foodName: postData.food_name[0],
      foodNameNative: postData.food_name_native[0],
      ingredients: postData.sections[0],
      instructions: postData.instructions[0],
      isActive: true,
      isFlagged: false,
      isRecipe: Boolean(postData.is_recipe[0]),
      isTraditional: Boolean(postData.is_traditional[0]),
      note: postData.note[0],
      recipeSource: postData.recipe_source[0],
      servingSize: postData.serving_size[0],
      suitedOccasion: postData.occasions[0],
      timeToCook: postData.time_to_cook[0],
      upVote: 0,
      video: postData.video,
    };
  } catch (err) {
    console.log(err);
  }
}

export function formatRegularPostData(postData: any) {
  if (!postData) return null;

  // console.log(postData);
  // return postData;

  return {
    authorId: postData.user[0],
    country: postData.countries[0],
    description: postData.description[0],
    difficulty: postData.difficulty[0],
    downVote: 0,
    filters: postData.filters[0],
    foodName: postData.food_name[0],
    foodNameNative: postData.food_name_native[0],
    ingredients: postData.sections[0],
    instructions: postData.instructions[0],
    isActive: true,
    isFlagged: false,
    isRecipe: Boolean(postData.is_recipe[0]),
    isTraditional: Boolean(postData.is_traditional[0]),
    note: postData.note[0],
    recipeSource: postData.recipe_source[0],
    servingSize: postData.serving_size[0],
    suitedOccasion: postData.occasions[0],
    timeToCook: postData.time_to_cook[0],
    upVote: 0,
  };
}

export function formatUpdateProfileData(profileData: any) {
  if (!profileData) return null;

  return {
    bio: profileData.bio[0],
    country: profileData.country[0],
    name: profileData.name[0],
    username: profileData.username[0],
  };
}
