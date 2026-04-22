// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

function tagClick(element) {
  var linkText = element.innerText || element.textContent;
  linkText = linkText.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');

  var evento = "click"
  var grupo = element.className

  if(linkText.includes("download")){
    evento = "file_download"
  }

  if(linkText.includes("_ver_mais")){
    grupo = linkText.replace("_ver_mais", "")
    linkText = linkText.replace( grupo + "_", "")
  }

  gtag('event', evento, {
    'page_location': document.location.href,
    'element_name': linkText,
    'element_group': grupo
  });
  console.log(evento, linkText, grupo)
}

function tagForm(element){
  var linkText = element.innerText || element.textContent;
  linkText = linkText.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');

  switch(element.tagName) {
    case "INPUT":
      gtag('event', 'form_start', {
        'page_location': document.location.href,
        'form_id': element.id,
        'form_name': element.closest('form').className,
        'form_destination': "teste"
      });
      break;
    case "BUTTON": 
      gtag('event', 'form_submit', {
        'page_location': document.location.href,
        'form_id': element.id,
        'form_name': element.closest('form').className,
        'form_submit_text': linkText,
        'form_destination': "teste"
      }); 
      break;
  }
}

function tagModal(element){
  gtag('event', 'view_form_success', {
    'page_location': document.location.href,
    'form_id': element.id || "modal_form_sucesso",
    'form_name': document.querySelector("form").className,
  });
}

function observarElemento(callback) {
  const elemento = document.body;

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class' && elemento.className.includes("lightbox-open")) {
        const classesAtuais = elemento.className;
        callback(classesAtuais);
      }
    }
  });

  observer.observe(document.body, {
    attributes: true, 
    attributeFilter: ['class']
  });
}

if (document.location.pathname.includes("/sobre")){
    observarElemento((el) => {
    console.log('Elemento alterado!', el);
    tagModal(document.querySelector('.lightbox-content'))
  });
}