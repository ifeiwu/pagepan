var editor = parent.hugerte.activeEditor
var axupimgs = parent.axupimgs
axupimgs.res = [] // 存放本地图片的数组
var blobInfo = { file: null }
blobInfo.blob = function() {
    return this.file
}
var upload_handler = axupimgs.many_images_upload_handler
var upload_base_path = axupimgs.images_upload_base_path

// 为列表添加排序
function reSort() {
    document.querySelectorAll('#file_list li').forEach((el, i) => {
        el.setAttribute('data-num', i)
    })
}

function addList(files) {
    var files_sum = files.length
    var vDom = document.createDocumentFragment()
    for (let i = 0; i < files_sum; i++) {
        let file = files[i]
        let blobUrl = window.URL.createObjectURL(file)
        axupimgs.res.push({ file: file, blobUrl: blobUrl, url: '' })
        let li = document.createElement('li')
        li.setAttribute('class', 'up-no')
        li.setAttribute('data-time', file.lastModified)
        li.innerHTML =
            '<div class="picbox"><img src="' +
            blobUrl +
            '"></div><div class="namebox"><span>' +
            file.name +
            '</span></div><div class="tools"><a class="remove"></a></div>'
        vDom.appendChild(li)
    }
    document.querySelector('#file_list').appendChild(vDom)
    //reSort();
}

// 清空列表
document.querySelector('#topbar .removeall').addEventListener('click', () => {
    if (document.querySelector('#topbar .upall').disabled == true) {
        alert('图片正在上传中...');
        return;
    }
    axupimgs.res = []
    document.querySelectorAll('#file_list li').forEach((el, i) => {
        el.parentNode.removeChild(el)
    })
})
// 拖拽添加
document.addEventListener('dragover', e => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
})
document.addEventListener('drop', e => {
    e.stopPropagation()
    e.preventDefault()
    if (!e.dataTransfer.files) {
        return false
    }
    var dropfiles = e.dataTransfer.files
    if (!(dropfiles.length > 0)) {
        return false
    }
    var exts = axupimgs.axupimgs_filetype
        .replace(/(\s)+/g, '')
        .toLowerCase()
        .split(',')
    var files = []
    for (let file of dropfiles) {
        ext = file.name.split('.')
        ext = '.' + ext[ext.length - 1]
        for (let s of exts) {
            if (s == ext) {
                files.push(file)
                break
            }
        }
    }
    if (files.length > 0) {
        addList(files)
    }
})

// 添加图片
document.querySelector('#topbar .addfile').addEventListener('click', () => {
    var input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('multiple', 'multiple')
    input.setAttribute('accept', axupimgs.axupimgs_filetype)
    input.click()
    input.onchange = function() {
        var files = this.files
        addList(files)
    }
})

var file_i = 0

function upAllFiles(n) {
    var len = axupimgs.res.length
    file_i = n
    if (len == n) {
        file_i = 0
        document.querySelector('#topbar .upall').removeAttribute('disabled');
        return true
    }
    if (axupimgs.res[n].url != '') {
        n++
        upAllFiles(n)
    } else {
        blobInfo.file = axupimgs.res[n].file
        upload_handler(
            blobInfo,
            function(url) {
                if (upload_base_path) {
                    if (upload_base_path.slice(-1) == '/' && url.substr(0, 1) == '/') {
                        url = upload_base_path + url.slice(1)
                    } else if (upload_base_path.slice(-1) != '/' && url.substr(0, 1) != '/') {
                        url = upload_base_path + '/' + url
                    } else {
                        url = upload_base_path + url
                    }
                }
                axupimgs.res[file_i].url = url
                filename = url.split('/').pop()
                var li = document.querySelectorAll('#file_list li')[file_i]
                li.setAttribute('class', 'up-over')
                li.querySelector('.namebox span').innerText = filename
                n++
                upAllFiles(n)
            },
            function(err) {
                document.querySelector('#topbar .upall').removeAttribute('disabled');
                document.querySelectorAll('#file_list li.up-now').forEach((el, i) => {
                    el.setAttribute('class', 'up-no')
                })
                alert(err)
            }
        )
    }
}

document.querySelector('#topbar .upall').addEventListener('click', e => {
    if (axupimgs.res.length > 0) {
        document.querySelectorAll('#file_list li.up-no').forEach((el, i) => {
            el.classList ? el.classList.add('up-now') : (el.className += ' up-now')
        })
        e.currentTarget.setAttribute('disabled', 'disabled');
        upAllFiles(0)
    } else {
        alert('请点击“添加图片”之后，再点击“开始上传”按钮。');
    }
})

var observ_flist = new MutationObserver((muList, observe) => {
    if (muList[0].addedNodes.length > 0) {
        muList[0].addedNodes.forEach(el => {
            el.querySelector('.remove').addEventListener('click', e => {
                var li = e.target.parentNode.parentNode
                var n = li.getAttribute('data-num')
                var el = document.querySelectorAll('#file_list li')[n]
                el.parentNode.removeChild(el)
                axupimgs.res.splice(n, 1)
            })
        })
    }
    reSort()
})

observ_flist.observe(document.querySelector('#file_list'), { childList: true })