/**
 * contact.js
 * Client-side validation plus submission to Web3Forms (see contact.html
 * for the access_key). On success/failure we show a status message near
 * the submit button. Includes a hidden honeypot field to filter bots.
 */

(function () {
  "use strict";

  function validateField(field) {
    const errorEl = field.parentElement.querySelector(".form-error");
    let message = "";

    if (field.validity.valueMissing) {
      message = "กรุณากรอกข้อมูลในช่องนี้";
    } else if (field.type === "email" && field.validity.typeMismatch) {
      message = "กรุณากรอกอีเมลให้ถูกต้อง";
    } else if (field.validity.tooShort) {
      message = `กรุณากรอกอย่างน้อย ${field.minLength} ตัวอักษร`;
    }

    if (errorEl) errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const status = document.getElementById("form-status");
    const fields = form.querySelectorAll("input[required], textarea[required]");

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    const submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(message, isSuccess) {
      if (!status) return;
      status.textContent = message;
      status.classList.toggle("is-success", !!isSuccess);
      status.classList.add("is-visible");
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;
      fields.forEach((field) => {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        setStatus("กรุณาตรวจสอบข้อมูลในฟอร์มก่อนส่งอีกครั้ง", false);
        return;
      }

      // Honeypot: if this hidden checkbox got checked, it was a bot.
      // Pretend to succeed without actually sending anything.
      const botField = form.querySelector('[name="botcheck"]');
      if (botField && botField.checked) {
        setStatus("ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อเข้ามา", true);
        form.reset();
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "กำลังส่ง...";
      }

      fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setStatus("ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อเข้ามา", true);
            form.reset();
          } else {
            setStatus(
              "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่านช่องทางโซเชียลมีเดียแทน",
              false
            );
          }
        })
        .catch(() => {
          setStatus(
            "ส่งข้อความไม่สำเร็จ (เชื่อมต่อไม่ได้) กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่านช่องทางโซเชียลมีเดียแทน",
            false
          );
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
          }
        });
    });
  }

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
