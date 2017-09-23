'use strict';

$(document).ready(() => {
  populateTable();
  $('#search').on('click', search);
});

// I don't really do front end work, sorry if this made someone retch.
function populateTable() {
  let tableContent = '';
  $.getJSON('/index', (data) => {
    data.forEach(d => {
      tableContent +=
      `<tr>
      <td>${d.organism_id}</td>
      <td>${d.organism_desc}</td>
      <td>${d.sequence_location}</td>
      </tr>`;
    });
    $('#results tbody').html(tableContent);
  });
}

function search(evt){
  evt.preventDefault();

  const $input = $('#input');
  const seq = $input.val();

  if (!seq) {
    return;
  }

  const obj = { sequence: seq };
  /*
    In case anyone was wondering why I used a vanilla XMLHttpRequest,
    there's a fun problem with jQuery not properly passing json data
    via POST/PUT. I did have it set up as a GET with a query parameter,
    but that limits your character input to ~2000 characters.
  */
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/search');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 205) {
      $input.val('');
      return populateTable();
    }
    if (xhr.status > 399) {
      alert(`${xhr.response}\nSorry for the alert ¯\\_(ツ)_/¯`);
    }
  };
  xhr.send(safeString(obj));
}

function safeString(obj) {
  let str;
  try {
    str = JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return str;
}
