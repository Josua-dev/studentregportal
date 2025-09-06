document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect data
    const first = document.getElementById("first").value.trim();
    const last = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const prog = document.getElementById("prog").value;
    const year = document.querySelector("input[name='year']:checked");
    const interests = document.getElementById("interests").value.split(",");
    const photo = document.getElementById("photo").value || "https://placehold.co/128";

    // Validation
    let valid = true;
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    if (!first) { document.getElementById("err-first").textContent = "First name required"; valid = false; }
    if (!last) { document.getElementById("err-last").textContent = "Last name required"; valid = false; }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { document.getElementById("err-email").textContent = "Invalid email"; valid = false; }
    if (!prog) { document.getElementById("err-prog").textContent = "Select a programme"; valid = false; }
    if (!year) { document.getElementById("err-year").textContent = "Select year"; valid = false; }

    if (!valid) {
        document.getElementById("live").textContent = "Fix errors before submitting.";
        return;
    }

    // Create card
    const card = document.createElement("div");
    card.className = "card-person";
    card.innerHTML = `
        <img src="${photo}" alt="">
        <div>
            <h3>${first} ${last}</h3>
            <p><span class="badge">${prog}</span> <span class="badge">Year ${year.value}</span></p>
        </div>
        <button class="remove">Remove</button>
    `;
    document.getElementById("cards").prepend(card);

    // Add to table
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${first} ${last}</td>
        <td>${prog}</td>
        <td>${year.value}</td>
        <td>${interests.join(", ")}</td>
        <td><button class="remove">Remove</button></td>
    `;
    document.querySelector("#summary tbody").prepend(tr);

    // Remove action
    tr.querySelector(".remove").addEventListener("click", () => {
        tr.remove();
        card.remove();
    });
    card.querySelector(".remove").addEventListener("click", () => {
        tr.remove();
        card.remove();
    });

    document.getElementById("regForm").reset();
    document.getElementById("live").textContent = "Profile added successfully!";
});
