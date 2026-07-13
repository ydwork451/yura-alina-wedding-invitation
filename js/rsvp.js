document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".rsvp__form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const button = form.querySelector("button");

        const name = form.querySelector("input").value.trim();

        const answer = form.querySelector("select").value;

        const comment = form.querySelector("textarea").value.trim();

        if (!name) {

            alert("Будь ласка, введіть ваше ім'я.");

            return;

        }

        if (answer === "Оберіть відповідь") {

            alert("Будь ласка, оберіть відповідь.");

            return;

        }

        button.disabled = true;

        button.textContent = "Надсилання...";

        try {

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzff5SYBBBE2yY5uh5e4Lfk7KeWrTRSuvPTamCDeLpmZWQ1wAt7GCt6eSnM2n9rLf88/exec",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        answer,
                        comment
                    })
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("❤️ Дякуємо! Вашу відповідь отримано.");

                form.reset();

            } else {

                alert("Помилка. Спробуйте ще раз.");

            }

        } catch (err) {

            console.error(err);

            alert("Не вдалося відправити форму.");

        }

        button.disabled = false;

        button.textContent = "Підтвердити";

    });

});