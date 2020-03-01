import Rect from './Rect';

enum NODE_POSITION {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

class QuadTreeNode {
    public bounds: Rect = new Rect(0, 0, 100, 100);
    public children: any[] = [];
    public nodes: QuadTreeNode[] = [];
    public maxChildren: number = 4;
    public maxDepth: number = 4;
    public depth: number = 0;

    constructor(
        bounds: Rect,
        depth: number,
        maxDepth: number,
        maxChildren: number
    ) {
        this.bounds = bounds;

        if (maxChildren) {
            this.maxChildren = maxChildren;
        }

        if (maxDepth) {
            this.maxDepth = maxDepth;
        }

        if (depth) {
            this.depth = depth;
        }
    }

    clear(): void {
        this.children = [];

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clear();
        }

        this.nodes = [];
    }

    findIndex(item: Rect): number {
        let index = NODE_POSITION.TOP_LEFT;

        const isLeft: boolean = item.x > this.bounds.horizontalMidpoint;
        const isTop: boolean = item.y > this.bounds.verticalMidpoint;

        if (isLeft && !isTop) {
            index = NODE_POSITION.BOTTOM_LEFT;
        } else if (!isTop) {
            index = NODE_POSITION.TOP_RIGHT;
        } else {
            index = NODE_POSITION.BOTTOM_RIGHT;
        }

        return index;
    }

    insert(item: any): void {
        if (this.nodes.length) {
            const index = this.findIndex(item);

            this.nodes[index].insert(item);

            return;
        }

        this.children.push(item);

        if (this.depth < this.maxDepth && this.children.length > this.maxChildren) {
            this.subdivide();

            for (let i = 0; i < this.children.length; i++) {
                this.insert(this.children[i]);
            }

            this.children = [];
        }
    }

    retrieve(item: any): QuadTreeNode[] | any[] {
        if (this.nodes.length > 0) {
            const index = this.findIndex(item);

            return this.nodes[index].retrieve(item);
        }

        return this.children;
    }

    subdivide(): void {
        const nextDepth = this.depth + 1;

        this.nodes[NODE_POSITION.TOP_LEFT] = new QuadTreeNode(
            new Rect(
                this.bounds.x,
                this.bounds.y,
                this.bounds.halfWidth,
                this.bounds.halfHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.TOP_RIGHT] = new QuadTreeNode(
            new Rect(
                this.bounds.horizontalMidpoint,
                this.bounds.y,
                this.bounds.halfWidth,
                this.bounds.halfHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.BOTTOM_LEFT] = new QuadTreeNode(
            new Rect(
                this.bounds.x,
                this.bounds.verticalMidpoint,
                this.bounds.halfWidth,
                this.bounds.halfHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );

        this.nodes[NODE_POSITION.BOTTOM_RIGHT] = new QuadTreeNode(
            new Rect(
                this.bounds.horizontalMidpoint,
                this.bounds.verticalMidpoint,
                this.bounds.halfWidth,
                this.bounds.halfHeight
            ),
            nextDepth,
            this.maxDepth,
            this.maxChildren
        );
    }
}

export default QuadTreeNode;