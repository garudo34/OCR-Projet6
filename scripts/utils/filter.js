class SelectFilter{

    static init() {
        new SelectFilter()
    }
    
    constructor() {
        this.element = this.buildDOM()
    }

    buildDOM() {
        const $wrapper = document.getElementById('custom-select')
        const options = {
            'like': 'Popularité',
            'date': 'Date',
            'title': 'Titre'
        }
        const $label = document.createElement('label')
        $label.setAttribute('htmlFor', 'select')
        $label.textContent = "Trier par"
        const $selectInput = document.createElement('select')
        $selectInput.id = "select";
        $selectInput.name = "select";

        Object.keys(options).forEach((key) => {
            const $option = document.createElement("option");
            $option.value = key;
            $option.text = options[key];
            $selectInput.appendChild($option);
        })
        $wrapper.appendChild($label)
        $wrapper.appendChild($selectInput)

        return $wrapper
    }



}
