import Rect from './Rect';
import Node from './Node';

class QuadTree {
    public root: Node;

    constructor(bounds: Rect, maxDepth: number, maxChildren: number) {
        this.root = new Node(bounds, 0, maxDepth, maxChildren);
    }

    public clear(): void {
      this.root.clear();
    }

    public insert(itemOrList: any | any[]): void {
        if (itemOrList instanceof Array) {
            this._insertItemlist(itemOrList);

            return;
        }

        this.root.insert(itemOrList);
    }

    public retrieve(item: any): Node[] | any[] {
        return this.root.retrieve(item).slice(0);
    }

    private _insertItemlist(itemList: any[]): void {
        for (let i = 0; i < itemList.length; i++) {
            this.root.insert(itemList[i]);
        }
    }
}

export default QuadTree;