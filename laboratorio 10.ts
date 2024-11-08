class NodeRBT {
    private data: number;
    private father!: NodeRBT;
    private leftChild!: NodeRBT;
    private rightChild!: NodeRBT;
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = isLeaf ? "BLACK" : "RED";
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) {
            y.getLeftChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getLeftChild()) {
            x.getFather().setLeftChild(y);
        } else {
            x.getFather().setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf) {
            y.getRightChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getRightChild()) {
            x.getFather().setRightChild(y);
        } else {
            x.getFather().setLeftChild(y);
        }
        y.setRightChild(x);
        x.setFather(y);
    }

    private printNode(node: NodeRBT): void {
        if (node.getLeftChild() !== this.leaf) this.printNode(node.getLeftChild());
        console.log(node.getData() + "(" + node.getColor() + ")");
        if (node.getRightChild() !== this.leaf) this.printNode(node.getRightChild());
    }

    public printAll(): void {
        this.printNode(this.root);
    }

    private searchNode(startNode: NodeRBT, reference: number): string | void {
        if (startNode === this.leaf) {
            return "-1";
        }
        if (startNode.getData() === reference) {
            return `El nodo ${reference} se encontró`;
        }
        if (reference < startNode.getData()) {
            return this.searchNode(startNode.getLeftChild(), reference);
        }
        return this.searchNode(startNode.getRightChild(), reference);
    }

    public search(reference: number): string | void {
        return this.searchNode(this.root, reference);
    }

    public insert(data: number): void {
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }

        if (newNode.getFather().getFather() === this.leaf) return;

        this.fixInsert(newNode);
    }
}

const myRBTree: RBTree = new RBTree();
myRBTree.insert(7);
myRBTree.insert(15);
myRBTree.insert(11);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(50);
myRBTree.insert(45);

console.log("Recorrido Inorden:");
myRBTree.printAll();
console.log("Nodo encontrado-> ", myRBTree.search(15));
console.log("Nodo no encontrado-> ", myRBTree.search(150));
console.log("Dennys Carreto 2276616");
