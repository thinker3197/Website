(function() {
  var root = 'http://localhost:3000';
  var router = new Navigo(root);

  function activateRouter() {
    var $homeView = document.getElementById('js-home-view');
    var $blogView = document.getElementById('js-blog-view');

    var $blogNav = document.getElementById('js-blog-nav');

    router.on({
      '/': function() {
        $blogView.classList.add('hidden');
        $blogNav.classList.remove('active');
        $homeView.classList.remove('hidden');
      },
      '/blog': function() {
        $blogView.classList.remove('hidden');
        $blogNav.classList.add('active');
        $homeView.classList.add('hidden');

        populateBlog();
      }
    }).resolve();
  }

  function activateNavbar() {
    var $internalNav = document.getElementById('js-internal-nav');

    $internalNav.addEventListener('click', function onInternalNavClick(e) {
      if (e.target.nodeName === 'A' || e.target.nodeName === 'LI') {
        var route = '/' + e.target.innerText.toLowerCase();

        router.navigate(route);
      }
    });
  }

  function getBlogMetadata() {
    return new Promise(function(resolve, reject) {
      const url = '/api/posts';
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function() {
        if(this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        }
        else {
          reject();
        }
      };
      xhr.onerror = function() {
        reject();
      };
      xhr.send();
    });
  }

  function populateBlog() {
    getBlogMetadata().then(function(response) {

    }, function(){
      console.error('Whoops! An error occured');
    });
  }

  function init() {
    document.addEventListener("DOMContentLoaded", function(event) {
      activateRouter();
      activateNavbar();

      router.disableIfAPINotAvailable()
    });
  }

  init();
})();