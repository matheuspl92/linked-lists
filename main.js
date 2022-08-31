const NodeFactory = () => {
    let data = null;
    let nextNode = null;

    return {
        getData: () => { return data },
        setData: (newData) => { data = newData },
        getLink: () => { return nextNode },
        setLink: (node) => { nextNode = node }
    }
}

const LinkedListFactory = () => {
    let headNode = null;

    const _transverseToEnd = (node = headNode) => {
        return (node.getLink()) ? _transverseToEnd(node.getLink()) : node;
    };
    const _readAllData = (node = headNode) => {
        if (!node) return 'EMPTY LIST';
        console.log(node.getData());
        if (!node.getLink()) return 'LIST END';
        return _readAllData(node.getLink());
    };
    const _size = (node = headNode) => {
        if (!node) return 0;
        if (!node.getLink()) return 1;
        return _size(node.getLink()) + 1;
    };
    const _at = (index, node = headNode) => {
        if (index === 0) return node;
        if (!node.getLink()) return 'INVALID INDEX';
        return _at(index - 1, node.getLink());
    };
    const _contains = (value, node = headNode) => {
        if (!node) return 'EMPTY LIST';
        if (node.getData() === value) return true;
        if (!node.getLink()) return false;
        return _contains(value, node.getLink());
    };
    const _find = (value, index = 0, node = headNode) => {
        if (!node) return 'EMPTY LIST';
        if (node.getData() === value) return index;
        if (!node.getLink()) return null;
        return _find(value, index + 1, node.getLink());
    };
    const _toString = (node = headNode) => {
        if (!node.getLink()) return `( ${node.getData()} ) -> null`;
        return `( ${node.getData()} ) -> `.concat(_toString(node.getLink()));
    };

    return {
        append: (value) => {
            if (headNode === null) {
                headNode = NodeFactory();
                headNode.setData(value);
            } else {
                const newNode = NodeFactory();
                newNode.setData(value);
                _transverseToEnd().setLink(newNode);
            }
        },
        prepend: (value) => {
            if (headNode === null) {
                headNode = NodeFactory();
                headNode.setData(value);
                console.log('PREPENDED');
            } else {
                const newNode = NodeFactory();
                newNode.setData(value);
                newNode.setLink(headNode);
                headNode = newNode;
            }
        },
        readAllData: _readAllData,
        size: _size,
        head: () => { return headNode },
        tail: _transverseToEnd,
        at: _at,
        pop: () => {
            if (_size() === 1) {
                headNode = null;
            } else {
                _at(_size() - 2).setLink(null);
            }
        },
        contains: _contains,
        find: _find,
        toString: _toString,
    }

};

let newList = LinkedListFactory();
newList.append('DATA1');
newList.append('DATA2');
newList.append('DATA3');
newList.append('I AM LAST');
newList.prepend('PREPEND1');
newList.prepend('I AM FIRST');
console.log(newList.toString());

