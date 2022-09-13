//boo object class
class Bookmark {
    constructor(site_NAME,site_URL,site_ICON){
        this.site_NAME = site_NAME;
        this.site_URL = site_URL;
        this.site_ICON = site_ICON;
    }
}


//store class to localStorage in browser
class Store{

    static getBookmarks()
    {   let bookmarks;
        if(localStorage.getItem('bookmarks')==null)
        {
            bookmarks =[];
        }
        else
        {
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        }

    return bookmarks;
}

    static storeBookmark(new_bookmark)
    {
        let bookmarks = Store.getBookmarks();

        bookmarks.push(new_bookmark);

        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    static removeBookmark(site_URL)
    {
        
        let bookmarks = Store.getBookmarks();

        for(var i=0; i<bookmarks.length; i++)
        {

            if(bookmarks[i].site_URL ===site_URL)
            {
                bookmarks.splice(i,1);
            }
        }

        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

        UI.displayBookmarks();

    }
}


//UI class
class UI
{
    static displayBookmarks(){

        let bookmarks = Store.getBookmarks();
        var html="";

        for(var i=0; i<bookmarks.length; i++)
        {       

                let name =bookmarks[i].site_NAME;
                let url = bookmarks[i].site_URL;
                let favicon = bookmarks[i].site_ICON;
                

                html+=`<div class="col-12 display-bookmark">
                            
                            <a class="url-bookmark" href="${url}"> <picture class="url-icon"><img src="${favicon}"></picture> <span class="url-name">${name}</span></a>
                            <span class="material-icons url-bookmark-delete" onclick="Store.removeBookmark('${url}')">delete</span>
                        </div>`;
        }

        document.getElementById("output").innerHTML=html;


    }

    static msgBox(message,message_type)
    {
        let alert = document.createElement("div");
        let msg = document.createTextNode(message);

        alert.setAttribute('class',`alert alert-${message_type}`);
        alert.style.transition="all 0.45s ease-in-out";

        alert.appendChild(msg);

        var conatainer = document.getElementById("container");
        var divform = document.getElementById("input_window");

        conatainer.insertBefore(alert,divform);

        setTimeout(()=>
            document.querySelector(".alert").remove()
            ,3000);
        
    }

    static validate(site_NAME,site_URL)
    {
    if(site_NAME=="" || site_URL=="")
    {
         return false;
    }

    return true;
    }
}

//....................................................................................................................................................

//load page with data from local storage
document.addEventListener("onload",UI.displayBookmarks());



//eventlistener for save_btn
const save_btn = document.getElementById("save_btn");

save_btn.addEventListener("click",SaveBookmark);

function SaveBookmark(e)
{
    e.preventDefault();
    let siteName = document.getElementById("site_name").value;
    let siteUrl = document.getElementById("site_url").value;


    let url = siteUrl.split("/");
    let site_ICON = `${url[0]}//${url[2]}/favicon.ico`;

    
    if(UI.validate(siteName,siteUrl)==false)
    {
        UI.msgBox("Fill the empty fields!","danger");
    }
    else
    {

    let New_Bookmark = new Bookmark(siteName,siteUrl,site_ICON);
    
    Store.storeBookmark(New_Bookmark);
    
    UI.displayBookmarks();


    UI.msgBox("Bookmark has been added!","success");

//reset form
//document.getElementById("myform").Reset();

//preventing the default key event

    }
}

const add_new_btn = document.querySelector("#btn_add_new");
const input_window = document.querySelector("#input_window");

const close_btn = document.querySelector("#close_btn");


add_new_btn.addEventListener("click",()=>{
    if(window.getComputedStyle(input_window).display=="none")
    {
        input_window.style.display = "block";
    }

});

close_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    input_window.style.display = "none";
});







