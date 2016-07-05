var prompt = require('prompt');

prompt.start();
prompt.message = '';
prompt.delimiter = '\n';

function simplePrompt(question, next) {
  prompt.get([{
    description: question,
    name: 'answer'
  }], function (error, result) {
    next(result.answer);
  });
}

function gamePrompt(prompts, next, answer) {
  if (typeof prompts === 'string') {
    simplePrompt(prompts, next);
  } else if (prompts.length === 0) {
    return next(answer);
  } else {
    simplePrompt(prompts[0], function(answer) {
      gamePrompt(prompts.splice(1), next, answer);
    });
  }
}

module.exports = gamePrompt;
