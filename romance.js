let parseText = function (text) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let arrOfWords = text.toLowerCase()
    .split(' ')
    .reduce((arrOfWords, word) => {
      word = word.split('')
        .filter(x => alphabet.indexOf(x) > -1)
        .join('');
      arrOfWords.push(word);
      return arrOfWords
    },[])
  return arrOfWords;
}

function generateWordPairs(text) {
  let arrayOfWords = parseText(text);
  return arrayOfWords.reduce((dict, word, idx, array) => {
    if(dict[word]){
      dict[word].push(array[idx + 1])
    } else if(idx === array.length - 1){
    } else {
      dict[word] = [];
      dict[word].push(array[idx + 1])
    };
    return dict;
  }, {})
}
// let wordPairs = generateWordPairs(text);

function writeLine(dictionary, lengthOfWords){
  let length1 = lengthOfWords;
  let keys = []
  for(key in dictionary){
    keys.push(key)
  }
  keys = keys.filter(x => x);
  let word1 = keys[Math.floor(Math.random() * Math.floor(keys.length-1))]; 
  let line = [];
  function helperFunc(word, dict, length){
    if(length === 0){
      let finalWord = typeof line[line.length - 1] === 'string' ? 
        line[line.length - 1] : 
        line[line.length - 1][0];

      if(prepositions.indexOf(finalWord) >= 0 || articles.indexOf(finalWord) >= 0 || emphasis.indexOf(finalWord) >= 0 || conjunctions.indexOf(finalWord) >= 0){
        line = [];
        length = length1; 
        word = keys[Math.floor(Math.random() * Math.floor(keys.length-1))]; 
        } else {
        return `${line.join(' ')},`; 
      } 
    }
    if(word === 'i'){
      line.push(word.toUpperCase());
    } else {
      line.push(word);
    }

    if(dictionary[word] && dictionary[word].length > 1){
      word = dictionary[word][Math.floor(Math.random() * (dictionary[word].length-1))];
    } else if(!dictionary[word]){
      word = keys[Math.floor(Math.random() * Math.floor(keys.length-1))] 
    } else { 
      word = dictionary[word];
    } 
     return helperFunc(word, dict, (length - 1))
    }
  return helperFunc(word1, dictionary, length1);
}

function generatePoem(corpusOfWords, numberOfLines, wordsPerLine){
  let poem = [];
  let wordPairs = generateWordPairs(corpusOfWords);
  let helperFunc = function (dict, words, lines){
    if(lines === 0){
      poem = poem.join(' ');
      poem = poem[0].toUpperCase() + poem.slice(1);
      poem = poem.slice(0, poem.length - 2) + '.'
      return poem;
    }  
    poem.push(writeLine(wordPairs, wordsPerLine) + '\n')
    return helperFunc(dict, words, lines - 1);     
  }
    return helperFunc(wordPairs, wordsPerLine, numberOfLines);
}


let percyShelley = "The fountains mingle with the river \
And the rivers with the ocean, \
The winds of heaven mix for ever \
With a sweet emotion; \
Nothing in the world is single; \
All things by a law divine \
In one spirit meet and mingle. \
Why not I with thine— \
See the mountains kiss high heaven \
And the waves clasp one another; \
No sister-flower would be forgiven \
If it disdained its brother; \
And the sunlight clasps the earth \
And the moonbeams kiss the sea: \
What is all this sweet work worth \
If thou kiss not me? "

let articles = ['a', 'an', 'the'];

let conjunctions = ['and', 'but', 'if', 'or', 'that', 'which'];

let emphasis = ['very', 'so', 'such', 'its'];

let prepositions = ['about', 'below', 'excepting', 'off', 'toward', 'above', 'beneath', 'for', 
'on', 'under', 'across', 'beside', 'besides', 'from', 'onto', 'underneath', 
'after', 'between', 'in', 'out', 'until', 'against', 'beyond', 'of', 
'outside', 'up', 'along', 'but', 'inside', 'over', 'upon', 'among', 'by', 
'past', 'to', 'around', 'concerning',  'regarding', 'with', 'at', 
'despite', 'into', 'since', 'within', 'down', 'like', 'through', 'without',
'before', 'during', 'near', 'throughout', 'behind', 'except'];


console.log(generatePoem(percyShelley, 8, 5))
