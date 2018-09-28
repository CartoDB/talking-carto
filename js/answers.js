
var search = instantsearch({
  // Replace with your own values
  appId: '6JYEHGZZHO',
  apiKey: 'd9345c3e3c5e775620b11562740de89f', // search only API key, no ADMIN key
  indexName: 'help',
//   urlSync: true,
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#tc-messenger-input',
    searchOnEnterKeyPressOnly: true, 
  })
);



const hitTemplate = function(hit) {
    let date = '';
    if (hit.date) {
      date = moment.unix(hit.date).format('MMM D, YYYY');
    }
  
    let url = `{{ site.baseurl }}${hit.url}#${hit.anchor}`;
  
    const title = hit._highlightResult.title.value;
  
    let breadcrumbs = '';
    if (hit._highlightResult.headings) {
      breadcrumbs = hit._highlightResult.headings.map(match => {
        return `<span class="post-breadcrumb">${match.value}</span>`
      }).join(' > ')
    }
  
    const content = hit._highlightResult.html != undefined ? hit._highlightResult.html.value : "";
  
    return `
      <div class="post-item">
        <span class="post-meta">${date}</span>
        <h2><a class="post-link" href="${url}">${title}</a></h2>
        <div class="post-snippet">${content}</div>
      </div>
    `;
  }
search.addWidget(
  instantsearch.widgets.hits({
    container: '#tc-messenger-suggestions',
    templates: {
      item: hitTemplate,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

// Add this after all the search.addWidget() calls
search.start();

/* $('.tc-launcher-open-icon, .tc-launcher-close-icon').on('click', function(){
    $('.tc-launcher-close-icon').toggleClass('open');
    $('.tc-messenger').toggleClass('open');
    $('.tc-launcher-open-icon').toggleClass('close');
}) */

$( function() {
  $( ".dialog" ).dialog({
    autoOpen: false,
    show: {
      duration: 1000
    },
    hide: {
      duration: 1000
    }
  });

  $( ".opener" ).on( "click", function() {
    $( ".dialog" ).dialog( "open" );
    $( ".dialog" ).dialog( "option", "height", 450 );
    $( ".dialog" ).dialog( "option", "width", 375 );
    $( ".dialog" ).dialog({
      position: { my: "left bottom", at: "right top", of: ".opener" },
      draggable: false
    });
  });
} );

$( function() {
  $( "#tc-messenger" ).tabs();
} );

$('.ais-search-box').keypress(function(event) {
  if (event.keyCode == 13) {
      $('.tc-messenger').show();
      $('#homescreen').hide();
  }
});

$('body').on('click', '.arrow', function() {
  event.preventDefault();
  $('.tc-messenger').hide();
  $('#homescreen').show();
});

$('body').on('click', '.activate-ask', function() {
  event.preventDefault();
  $('.tc-messenger').show();
  $('#homescreen').hide();
});