// change status
const formChangeStatus = document.querySelector("form[data-path]");
if(formChangeStatus){
    const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
    buttonChangeStatus.forEach(button=>{
        const path = formChangeStatus.getAttribute("data-path")
        button.addEventListener("click",()=>{
            const id = button.getAttribute("data-id")
            const status = button.getAttribute("data-status")
            const currentStatus = status == "active" ? "inactive" : "active";
            formChangeStatus.action = `/${path}/${currentStatus}/${id}?_method=PATCH`
            formChangeStatus.submit();
        })
    })
    console.log(formChangeStatus)
}
// end change status
