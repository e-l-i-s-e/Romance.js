function parseText(text) { // build array from text block
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return text
    .toLowerCase()
    .split(' ')
    .reduce((arrOfWords, word) => {
      word = word
        .split('')
        .filter(char => alphabet.indexOf(char) > -1)
        .join('');
      arrOfWords.push(word);
      return arrOfWords
    },[])
  return arrOfWords;
}

function generateWordPairs(text) {// creates a dictionary of the words with the words that follow it
  return parseText(text)
    .reduce((dict, word, idx, array) => {
      if(dict[word]){
        dict[word].push(array[idx + 1])
      } else if (idx < array.length - 1){
        dict[word] = [array[idx + 1]];
      };
    return dict;
  }, {})
}

function writeLine(dictionary, lengthOfWords){ // recursively create a line of poetry using the keys in the dictionary object 
  const keys = Object.keys(dictionary)
  
  function getWord(list){
    return list[Math.floor(Math.random() * (list.length - 1))]
  }

  let line = [];
  function helperFunc(word, dict, length){
    if(length === 0){
      let finalWord = typeof line[line.length - 1] === 'string' 
        ? line[line.length - 1] 
        : line[line.length - 1][0];

      // reject lines that end with prepositions, articles, emphasis words, and conjunctions
      if([...prepositions, ...articles, ...emphasis, ...conjunctions].includes(finalWord)){
        line = [];
        length = lengthOfWords; 
        word = getWord(keys); 
      } else {
        return `${line.join(' ')},`; 
      } 
    }
    
    if(word === 'i'){
      line.push(word.toUpperCase());
    } else {
      line.push(word);
    }

    if(dictionary[word]){
      if(dictionary[word].length > 1){
        word = getWord(dictionary[word]);
      } else { 
        word = dictionary[word];
      }
    } else if(!dictionary[word]){
      word = keys[Math.floor(Math.random() * Math.floor(keys.length-1))] 
    } else { 
      word = getWord(keys);
    } 
     return helperFunc(word, dict, (length - 1))
    }
  return helperFunc(getWord(keys), dictionary, lengthOfWords);
}

function generatePoem(corpusOfWords, numberOfLines, wordsPerLine){//recursively creates lines and formats the final poem
  const poem = [];
  const wordPairs = generateWordPairs(corpusOfWords);
  function helperFunc (lines){
    if(lines === 0){
      const textBlock = poem.join(' ');
      return textBlock.slice(0, 1).toUpperCase() + textBlock.slice(1, -2) + '.';
    }  
    poem.push(writeLine(wordPairs, wordsPerLine) + '\n')
    return helperFunc(lines - 1);     
  }
    return helperFunc(numberOfLines);
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

let emphasis = ['very', 'so', 'such'];

let prepositions = ['about', 'below', 'excepting', 'off', 'toward', 'above', 'beneath', 'for', 
'on', 'under', 'across', 'beside', 'besides', 'from', 'onto', 'underneath', 
'after', 'between', 'in', 'out', 'until', 'against', 'beyond', 'of', 
'outside', 'up', 'along', 'but', 'inside', 'over', 'upon', 'among', 'by', 
'past', 'to', 'around', 'concerning',  'regarding', 'with', 'at', 
'despite', 'into', 'since', 'within', 'down', 'like', 'through', 'without',
'before', 'during', 'near', 'throughout', 'behind', 'except'];


console.log(generatePoem(percyShelley, 8, 5))
