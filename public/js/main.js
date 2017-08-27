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

  function init() {
    document.addEventListener("DOMContentLoaded", function(event) {
      activateRouter();
      activateNavbar();

      router.disableIfAPINotAvailable()
    });
  }

  init();
})();