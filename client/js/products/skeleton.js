export function showSkeleton(count = 6){
    const item_container = document.querySelector(".item");
    item_container.innerHTML = "";

    const skHeading = document.createElement("div");
    skHeading.className = "item__type";
    skHeading.innerHTML = `<div class="skeleton skeleton-line-lg" style="width: 120px; height:14px;"></div>`;

    const skWrapper = document.createElement("div");
    skWrapper.className = "item__wrapper";

    for(let i = 0; i < count; i++){
        skWrapper.innerHTML += `
            <div class="skeleton-card">
                <div class="skeleton skeleton-img"></div>
                <div class="skeleton skeleton-line-lg"></div>
                <div class="skeleton skeleton-line-sm"></div>
                <div class="skeleton skeleton-footer"></div>
            </div>`;
    }

    item_container.append(skHeading, skWrapper);
}