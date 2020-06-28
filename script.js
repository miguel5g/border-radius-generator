$(document).ready(() => {

  const lTopInput = $('input#b1');
  const rTopInput = $('input#b2');
  const lBottomInput = $('input#b3');
  const rBottomInput = $('input#b4');

  const box = $('.box');
  const preview = $('span#result');
  const copyBtn = $('button#copy-result');

  const regex = /([0-9])/g;

  lTopInput.keyup(() => updateBoxBorder());
  rTopInput.keyup(() => updateBoxBorder());
  lBottomInput.keyup(() => updateBoxBorder());
  rBottomInput.keyup(() => updateBoxBorder());

  copyBtn.click(() => copyResults());

  function getValues() {

    let rTValue = rTopInput.val().match(regex) || [''];
    let rBValue = rBottomInput.val().match(regex) || [''];
    let lTValue = lTopInput.val().match(regex) || [''];
    let lBValue = lBottomInput.val().match(regex) || [''];

    rTValue = rTValue.join('') === '' ? '0' : (Number(rTValue.join('')) > 200 ? '200' : rTValue.join(''));
    rBValue = rBValue.join('') === '' ? '0' : (Number(rBValue.join('')) > 200 ? '200' : rBValue.join(''));
    lTValue = lTValue.join('') === '' ? '0' : (Number(lTValue.join('')) > 200 ? '200' : lTValue.join(''));
    lBValue = lBValue.join('') === '' ? '0' : (Number(lBValue.join('')) > 200 ? '200' : lBValue.join(''));

    rTopInput.val(rTValue);
    rBottomInput.val(rBValue);
    lTopInput.val(lTValue);
    lBottomInput.val(lBValue);

    return {
      rightTop: rTValue,
      rightBottom: rBValue,
      leftTop: lTValue,
      leftBottom: lBValue,
    };
  }

  function updateBoxBorder() {
    const newValues = getValues();

    const newBorder = `${newValues.leftTop}px ${newValues.rightTop}px ${newValues.rightBottom}px ${newValues.leftBottom}px`;
    box.css('border-radius', newBorder);
    box.css('-moz-border-radius', newBorder);
    box.css('-webkit-border-radius', newBorder);

    const codePreview = `<div>border-radius: ${newBorder};</div>
<div>-moz-border-radius: ${newBorder};</div>
<div>-webkit-border-radius: ${newBorder};</div>
    `

    preview.html(codePreview);
    preview.removeClass('hide');
    copyBtn.removeClass('hide');

    values = newValues;
  }

  function copyResults() {
    const temp = $('<input>');
    $('body').append(temp);
    temp.val(preview.text()).select();
    document.execCommand("copy");
    temp.remove();
  }
});