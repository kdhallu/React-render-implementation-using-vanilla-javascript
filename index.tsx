let React = {
    createElement: (tag, props, ...children) => {
        if(typeof tag === "function") {
           return tag(props)
        }

        var element  = {
            tag, props: {...props, children},
        }

        console.log(element)
        return element;
    }
}


const render = (reactElement, container) => {
    if(['string', 'number'].includes(typeof reactElement)) {
        container.appendChild(document.createTextNode(String(reactElement)))
        return;
    }

    const actualDomElement = document.createElement(reactElement.tag)
    if(reactElement.props) {
        Object.keys(reactElement.props)
            .filter((p) => p !== 'children')
            .forEach((p) => actualDomElement[p] = reactElement[p])
    }

    if(reactElement.props.children){
        reactElement.props.children.forEach(child => render(child, actualDomElement))
    }

    container.appendChild(actualDomElement);
}


const App = () => <div className="test-class">
    <h1>Hello World</h1>
    <span>This is span tag</span>
    <p>this is p tag</p>

</div>

render(<App />, document.querySelector('#app'))