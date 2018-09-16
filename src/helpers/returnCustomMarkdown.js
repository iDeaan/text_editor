const returnCustomMarkdown = (inputData) => {
  let transformedData = inputData;

  const imagePattern = /https?:\/\/\S+\.(png|jpg)/gi;
  const boldPattern = /\*\*(.+?)\*\*/gi;
  const italicPattern = /\*(.+?)\*/gi;
  const newLinePattern = /(?:\r\n|\r|\n)/gi;
  const youtubePattern = /http(?:s)?:\/\/(?:www.)?youtu(?:.be\/(\S{11})|be)?(?:.com\/)?(?:\S+v=(\S{11}))?/gi;

  const imageMatches = imagePattern.exec(inputData);
  const boldMatches = boldPattern.exec(inputData);
  const italicMatches = italicPattern.exec(inputData);
  const newLineMatches = newLinePattern.exec(inputData);
  const youtubeMatches = youtubePattern.exec(inputData);

  if (imageMatches || boldMatches || italicMatches || newLineMatches || youtubeMatches) {
    transformedData = transformedData.replace(imagePattern, '<img src="$&" />');
    transformedData = transformedData.replace(boldPattern, '<b>$1</b>');
    transformedData = transformedData.replace(italicPattern, '<i>$1</i>');
    transformedData = transformedData.replace(newLinePattern, '<br />');

    if (youtubeMatches) {
      transformedData = transformedData.replace(
        youtubePattern,
        `<iframe width="580px" height="315px" src="https://www.youtube.com/embed/${youtubeMatches[1] || youtubeMatches[2]}?wmode=opaque" frameborder="0" allowfullscreen></iframe>`
      );
    }
  }

  return transformedData;
};

export default returnCustomMarkdown;
