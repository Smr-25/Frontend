
let draggedBox = null;

document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("dragstart", function () {
        draggedBox = this;
    });
});

document.querySelectorAll(".container1").forEach(area => {

    area.addEventListener("dragover", function (ev) {
        ev.preventDefault();
    });

    area.addEventListener("drop", function () {
        let id = draggedBox.id.replace("box", "");
        id = Number(id);
        let areaId = this.id;
        let canDrop =
            (areaId === "container1" && id >= 1 && id <= 4) ||
            (areaId === "container2" && id >= 5 && id <= 8) ||
            (areaId === "container3" && id >= 9 && id <= 12);

        if (canDrop) {
            this.appendChild(draggedBox);
            Swal.fire({
                title: "Uğurlu!",
                text: "Box uğurla bu areaya düşdü!",
                icon: "success",
                confirmButtonText: "Bağla"
            });
        } else {
            Swal.fire({
                title: "Xəta!",
                text: "Bu box bu areaya düşə bilməz!",
                icon: "error",
                confirmButtonText: "Bağla"
            });
        }
    });
});

