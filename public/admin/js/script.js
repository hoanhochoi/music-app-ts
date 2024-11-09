// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    });
}
// End Upload Image

// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    let url = new URL(window.location.href)
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            url.searchParams.set("page", page)
            window.location.href = url.href;
        })
    })
}
// end pagination

// change-checkboxMulti
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const checkboxAll = checkboxMulti.querySelector("input[name=checkall]");
    const checkIds = checkboxMulti.querySelectorAll("input[name='id']")
    console.log(checkIds)
    console.log(checkboxAll)
    checkboxAll.addEventListener('click', () => {
       if(checkboxAll.checked == true){
        checkIds.forEach(item => {
            item.checked = true;
        })
       }else{
        checkIds.forEach(item => {
            item.checked = false;
        })
       }
    })

    checkIds.forEach(item=>{
        item.addEventListener("click",()=>{
            const countCheckedId = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countCheckedId == checkIds.length)
                checkboxAll.checked = true;
            else
                checkboxAll.checked = false;
        })
    })
}

// end change-checkboxMulti


// form change-multi
const formChangeMulti = document.querySelector("form[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = document.querySelectorAll("input[name='id']:checked");
        const typeChange = e.target.elements.type.value;
        if(inputsChecked.length > 0){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input =>{
                const id = input.getAttribute("value")
                ids.push(id);
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
            console.log(ids);
        }else alert("vui lòng chọn ít nhất bản ghi")


    })
}
// end form change-multi