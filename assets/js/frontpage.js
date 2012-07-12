KISSY.use('template', function(S, Template) {

    var tmpl = S.one('#j-repo-template').html()

    S.IO.get('https://api.github.com/orgs/etaoux/repos', function(data) {
        delete_if(data, function(repo) {
            return repo.name === 'etaoux.github.com'
        })
        console.log(data)
        var markup = Template(tmpl).render({repos: data})

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