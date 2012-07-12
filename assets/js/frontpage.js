KISSY.use('template', function(S, Template) {

    var tmpl = S.one('#j-repo-template').html()

    S.IO.jsonp('https://api.github.com/orgs/etaoux/repos', function(data) {
        var repos = data.data,
            markup

        delete_if(repos, function(repo) {
            return repo.name === 'etaoux.github.com'
        })
        markup = Template(tmpl).render({repos: repos})

        S.one('#repos').html(markup)
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
})