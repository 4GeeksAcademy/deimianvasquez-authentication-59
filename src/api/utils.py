from flask import jsonify, url_for
import re


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" +
                         y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"


def es_correo_valido(correo: str) -> bool:
    """
    Valida sintácticamente un correo electrónico utilizando una expresión regular.

    Verifica que el correo tenga el formato general:
    - caracteres válidos para el nombre de usuario
    - un símbolo '@'
    - caracteres válidos para el nombre de dominio
    - un punto '.'
    - una extensión (TLD) de al menos 2 caracteres

    Args:
        correo: La cadena de texto a validar.

    Returns:
        True si el correo es sintácticamente válido, False en caso contrario.
    """
    # Expresión regular para la validación sintáctica de correos.
    # Es un patrón común que cubre la mayoría de los casos de uso estándar.
    patron = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    # re.fullmatch() asegura que la expresión regular coincida con toda la cadena.
    if re.fullmatch(patron, correo):
        return True
    else:
        return False

# # --- Ejemplos de uso ---
# print(f"test@example.com: {es_correo_valido('test@example.com')}")   # True
# print(f"usuario.123@sub.dominio.co: {es_correo_valido('usuario.123@sub.dominio.co')}") # True
# print(f"nombre.apellido@empresa: {es_correo_valido('nombre.apellido@empresa')}") # False (Falta el .tld)
# print(f"@dominio.com: {es_correo_valido('@dominio.com')}")       # False (Falta el usuario)
# print(f"correo sin arroba: {es_correo_valido('correo sin arroba')}") # False
# print(f"email@.com: {es_correo_valido('email@.com')}")           # False (Dominio empieza con .)
