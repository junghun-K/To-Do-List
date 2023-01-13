// referred from: https://www.w3schools.com/jsref/tryit.asp?filename=try_dom_event_currenttarget
async function checkStatus(e, id) {
  let value = 0;

  if (e.currentTarget.checked) { // target is check box
    console.log('CHECKED');
    // referred from: https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
    e.currentTarget.parentNode.style.background = 'rgb(242, 242, 170)';
    value = 1;
  } else {
    console.log('UNCHECKED');
    e.currentTarget.parentNode.style.background = 'rgb(228, 228, 221)';
    value = 0;
  } 
  
  // send put request to change the status of the data
  try {
    let res = await fetch(`/main/put/${id}/${value}`, {method: "PUT"});
    if (res.ok) {
      console.log('OK');
    } else {
      console.log('res not ok');
    }
  } catch (error) {
    error;
  }
}