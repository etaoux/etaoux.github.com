KISSY.use('template', function(S, Template) {


    S.IO.jsonp('https://api.github.com/orgs/etaoux/repos', function(data) {
        var repo_tmpl = S.one('#j-repo-template').html(),
            repos = data.data,
            markup

        delete_if(repos, function(repo) {
            return repo.name === 'etaoux.github.com'
        })
        markup = Template(repo_tmpl).render({repos: repos})

        S.one('#repos').append(markup)
    })

    S.IO.jsonp('https://api.github.com/orgs/etaoux/members', function(data) {
        var user_tmpl = S.one("#j-user-template").html(),
            markup = Template(user_tmpl).render({members: data.data})

        S.one('#members').html(markup)
    })

    function delete_if(arr, fn) {
        var i, found = false

        for (i = 0; i < arr.length; i++) {
            if (!!fn(arr[i])) {
                found = true
                break
            }
        }

        if (found) {
            return arr.splice(i, 1)
        }
    }
});