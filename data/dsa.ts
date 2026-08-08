export const dsaStats = [
  { value: "500+", label: "Problems Solved" },
  { value: "200+", label: "LeetCode Problems" },
  { value: "150+", label: "Codeforces Problems" },
  { value: "Master", label: "DSA in Java" },
] as const;

export const dsaLearningPath = [
  {
    title: "Recognize the pattern",
    description:
      "Identify whether the problem is about ordering, connectivity, repeated states, monotonic behavior, or exhaustive choices.",
  },
  {
    title: "Choose the right structure",
    description:
      "Map the constraints to arrays, stacks, queues, trees, graphs, heaps, hash maps, or DP tables before writing code.",
  },
  {
    title: "Prove the complexity",
    description:
      "Validate the time and space complexity against input limits, edge cases, and worst-case behavior.",
  },
] as const;

export const dsaTopics = [
  {
    title: "Arrays",
    category: "gradient Data Structure",
    difficulty: "Foundation",
    description:
      "Arrays store elements in contiguous memory and are the base for traversal, two pointers, prefix sums, frequency counting, and sliding window problems.",
    patterns: ["Traversal", "Two Pointers", "Prefix Sum", "Sliding Window"],
    recognition: [
      "Input is a list of numbers, strings, intervals, or records.",
      "The problem asks for subarray, pair, range, duplicate, frequency, or sorted-order logic.",
      "Constraints allow O(n), O(n log n), or sometimes O(1) extra space.",
    ],
    approach: [
      "Check whether order matters and whether the array is sorted.",
      "Use two pointers for pair/range problems and prefix sums for repeated range queries.",
      "Use a hash map or fixed frequency array when values need counting.",
      "Handle empty array, single element, duplicate values, and negative numbers explicitly.",
    ],
    complexity: "Access O(1), Search O(n), Insert/Delete O(n)",
    useCase:
      "Used in sorting, searching, DP tables, frequency counts, interval merging, and most interview fundamentals.",
    example: {
      problem: "Find the maximum sum of a subarray of size k.",
      input: "arr = [2, 1, 5, 1, 3, 2], k = 3",
      output: "9",
      explanation:
        "Use a sliding window. The best window is [5, 1, 3], whose sum is 9. Instead of recalculating every window, remove the outgoing element and add the incoming element.",
    },
    pitfalls: [
      "Recomputing each range from scratch when prefix/window logic is enough.",
      "Forgetting negative numbers when initializing max/min values.",
      "Off-by-one errors in window boundaries.",
    ],
    practice: ["Maximum Subarray", "Two Sum", "Product Except Self"],
    code: `int maxSumWindow(int[] arr, int k) {
  int window = 0;
  for (int i = 0; i < k; i++) window += arr[i];

  int best = window;
  for (int right = k; right < arr.length; right++) {
    window += arr[right];
    window -= arr[right - k];
    best = Math.max(best, window);
  }
  return best;
}`,
  },
  {
    title: "Linked Lists",
    category: "Pointer-Based Structure",
    difficulty: "Foundation",
    description:
      "Linked lists connect nodes through references. They test pointer discipline, mutation safety, cycle detection, and in-place transformations.",
    patterns: [
      "Fast & Slow Pointers",
      "Reversal",
      "Merge Lists",
      "Cycle Detection",
    ],
    recognition: [
      "The input is a head node instead of a random-access array.",
      "The task asks for reversing, merging, deleting, detecting cycles, or finding middle nodes.",
      "O(1) extra space is often expected.",
    ],
    approach: [
      "Draw the pointer movement before coding.",
      "Use dummy nodes for insert/delete/merge problems.",
      "Store next before changing current.next during reversal.",
      "For cycle or middle detection, move slow by one step and fast by two steps.",
    ],
    complexity:
      "Access O(n), Search O(n), Insert/Delete O(1) when the target node is known",
    useCase:
      "Useful for understanding memory links, LRU caches, queues, undo chains, and pointer-heavy interview problems.",
    example: {
      problem: "Reverse a singly linked list in-place.",
      input: "1 -> 2 -> 3 -> 4 -> null",
      output: "4 -> 3 -> 2 -> 1 -> null",
      explanation:
        "Maintain prev, current, and next. Save current.next first, point current.next to prev, then move prev and current forward.",
    },
    pitfalls: [
      "Losing the remaining list by changing current.next before saving next.",
      "Not handling empty or single-node lists.",
      "Creating unnecessary extra nodes when the problem asks for in-place mutation.",
    ],
    practice: [
      "Reverse Linked List",
      "Linked List Cycle",
      "Merge Two Sorted Lists",
    ],
    code: `class Node {
  int val;
  Node next;
  Node(int val) { this.val = val; }
}

Node reverse(Node head) {
  Node prev = null;
  Node current = head;

  while (current != null) {
    Node next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
  },
  {
    title: "Stacks",
    category: "gradient Data Structure",
    difficulty: "Foundation",
    description:
      "Stacks follow LIFO order. They are ideal when the latest unresolved item must be processed first.",
    patterns: [
      "Monotonic Stack",
      "Expression Parsing",
      "Backtracking",
      "Next Greater Element",
    ],
    recognition: [
      "The problem uses nested structures, brackets, undo behavior, or previous greater/smaller elements.",
      "You need to remember unresolved candidates while scanning left to right.",
      "Recursion can be simulated with an explicit stack.",
    ],
    approach: [
      "Push unresolved values or indexes, not always the raw value.",
      "For monotonic stacks, define whether the stack is increasing or decreasing.",
      "Pop while the current element resolves the top of the stack.",
      "Use the remaining stack after the scan for default answers.",
    ],
    complexity: "Push O(1), Pop O(1), Peek O(1); monotonic scans are O(n)",
    useCase:
      "Used in browser history, function calls, balanced parentheses, stock span, histogram area, and next-greater-element problems.",
    example: {
      problem: "Find the next greater element for every array position.",
      input: "arr = [2, 1, 2, 4, 3]",
      output: "[4, 2, 4, -1, -1]",
      explanation:
        "Keep indexes whose answer is not known. When a larger value appears, it becomes the next greater element for smaller indexes on the stack.",
    },
    pitfalls: [
      "Storing values when duplicate values require storing indexes.",
      "Using the wrong monotonic direction.",
      "Forgetting to fill unresolved items with -1 or another default.",
    ],
    practice: [
      "Valid Parentheses",
      "Daily Temperatures",
      "Largest Rectangle in Histogram",
    ],
    code: `int[] nextGreater(int[] arr) {
  int[] answer = new int[arr.length];
  Arrays.fill(answer, -1);
  Stack<Integer> stack = new Stack<>();

  for (int i = 0; i < arr.length; i++) {
    while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {
      answer[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return answer;
}`,
  },
  {
    title: "Queues",
    category: "gradient Data Structure",
    difficulty: "Foundation",
    description:
      "Queues follow FIFO order and are essential for breadth-first traversal, scheduling, and level-by-level processing.",
    patterns: [
      "BFS",
      "Level Order",
      "Sliding Window Queue",
      "Topological Processing",
    ],
    recognition: [
      "The problem asks for shortest path in an unweighted graph or matrix.",
      "Processing should happen in the same order elements are discovered.",
      "The task mentions levels, waves, infection spread, or minimum number of moves.",
    ],
    approach: [
      "Push the starting state into the queue and mark it visited immediately.",
      "Process queue size when level information is required.",
      "For grids, loop through direction arrays for neighbors.",
      "Avoid re-adding visited states to prevent infinite loops.",
    ],
    complexity: "Enqueue O(1), Dequeue O(1); BFS traversal O(V + E)",
    useCase:
      "Used in graph traversal, task scheduling, request processing, tree level-order traversal, and shortest unweighted paths.",
    example: {
      problem: "Find levels in a binary tree from top to bottom.",
      input: "Tree: 1 with children 2 and 3",
      output: "[[1], [2, 3]]",
      explanation:
        "Use queue size to separate levels. Each loop processes exactly the nodes currently in that level, then adds their children.",
    },
    pitfalls: [
      "Marking visited after poll instead of before offer, causing duplicates.",
      "Mixing level counters with node counters incorrectly.",
      "Using DFS for shortest unweighted path when BFS is required.",
    ],
    practice: [
      "Binary Tree Level Order",
      "Rotting Oranges",
      "Number of Islands",
    ],
    code: `List<List<Integer>> levelOrder(TreeNode root) {
  List<List<Integer>> levels = new ArrayList<>();
  if (root == null) return levels;

  Queue<TreeNode> queue = new LinkedList<>();
  queue.offer(root);

  while (!queue.isEmpty()) {
    int size = queue.size();
    List<Integer> level = new ArrayList<>();
    for (int i = 0; i < size; i++) {
      TreeNode node = queue.poll();
      level.add(node.val);
      if (node.left != null) queue.offer(node.left);
      if (node.right != null) queue.offer(node.right);
    }
    levels.add(level);
  }
  return levels;
}`,
  },
  {
    title: "Trees",
    category: "Hierarchical Structure",
    difficulty: "Intermediate",
    description:
      "Trees represent hierarchy and recursive relationships. Binary trees, BSTs, heaps, and tries appear frequently in interviews.",
    patterns: ["DFS", "BFS", "Recursion", "Lowest Common Ancestor"],
    recognition: [
      "The data has parent-child relationships or nested hierarchy.",
      "The answer depends on left/right subtree results.",
      "The task asks for path, height, ancestor, level, or validation logic.",
    ],
    approach: [
      "Decide preorder, inorder, postorder, or level-order traversal.",
      "Return useful information from recursive calls instead of using globals where possible.",
      "For BSTs, use value bounds or sorted inorder properties.",
      "For path problems, maintain current path and backtrack after visiting children.",
    ],
    complexity:
      "Traversal O(n), Balanced BST search O(log n), worst-case BST search O(n)",
    useCase:
      "Used in file systems, DOM structure, compiler ASTs, search indexes, heaps, and hierarchical data.",
    example: {
      problem: "Calculate the maximum depth of a binary tree.",
      input: "Tree with longest root-to-leaf path length 3",
      output: "3",
      explanation:
        "Depth is one plus the maximum depth of left and right subtrees. The base case for a null node is 0.",
    },
    pitfalls: [
      "Using inorder assumptions on a normal binary tree instead of a BST.",
      "Forgetting null base cases.",
      "Confusing node count depth with edge count height.",
    ],
    practice: ["Maximum Depth", "Validate BST", "Lowest Common Ancestor"],
    code: `int maxDepth(TreeNode root) {
  if (root == null) return 0;

  int left = maxDepth(root.left);
  int right = maxDepth(root.right);

  return 1 + Math.max(left, right);
}`,
  },
  {
    title: "Graphs",
    category: "Non-gradient Structure",
    difficulty: "Intermediate",
    description:
      "Graphs model relationships between nodes. They are key for networks, dependency resolution, routes, connectivity, and recommendations.",
    patterns: ["BFS", "DFS", "Shortest Path", "Topological Sort"],
    recognition: [
      "Entities are connected by edges, dependencies, roads, friendships, or prerequisites.",
      "The problem asks for connected components, cycles, paths, ordering, or reachability.",
      "Input may be an adjacency list, edge list, matrix, or grid.",
    ],
    approach: [
      "Convert the input into a clean adjacency representation.",
      "Track visited nodes for DFS/BFS.",
      "Use BFS for unweighted shortest paths and Dijkstra for weighted positive edges.",
      "Use indegree and queue for topological ordering.",
    ],
    complexity: "Traversal O(V + E); adjacency list space O(V + E)",
    useCase:
      "Used in maps, social networks, recommendation systems, dependency graphs, web crawlers, and pathfinding.",
    example: {
      problem: "Count connected components in an undirected graph.",
      input: "n = 5, edges = [[0,1], [1,2], [3,4]]",
      output: "2",
      explanation:
        "Build the graph, then start DFS from each unvisited node. Every new DFS start represents one connected component.",
    },
    pitfalls: [
      "Forgetting to add both directions in an undirected graph.",
      "Not handling isolated nodes.",
      "Using recursion on very large graphs without considering stack depth.",
    ],
    practice: ["Number of Provinces", "Course Schedule", "Clone Graph"],
    code: `int countComponents(int n, int[][] edges) {
  List<List<Integer>> graph = new ArrayList<>();
  for (int i = 0; i < n; i++) graph.add(new ArrayList<>());

  for (int[] edge : edges) {
    graph.get(edge[0]).add(edge[1]);
    graph.get(edge[1]).add(edge[0]);
  }

  boolean[] seen = new boolean[n];
  int components = 0;

  for (int node = 0; node < n; node++) {
    if (!seen[node]) {
      components++;
      dfs(node, seen, graph);
    }
  }
  return components;
}

void dfs(int node, boolean[] seen, List<List<Integer>> graph) {
  seen[node] = true;
  for (int next : graph.get(node)) {
    if (!seen[next]) dfs(next, seen, graph);
  }
}`,
  },
  {
    title: "Searching",
    category: "Algorithmic Technique",
    difficulty: "Foundation",
    description:
      "Searching finds target values efficiently. Binary search is especially important when the answer space is sorted or monotonic.",
    patterns: [
      "gradient Search",
      "Binary Search",
      "Search on Answer",
      "Lower Bound",
    ],
    recognition: [
      "The input or answer space is sorted, monotonic, or can be validated with a yes/no condition.",
      "The task asks for first/last occurrence, minimum feasible value, or exact target.",
      "O(n) may be too slow and O(log n) is expected.",
    ],
    approach: [
      "Define the invariant: what remains possible after every step.",
      "Use mid = left + (right - left) / 2 to avoid overflow.",
      "For search-on-answer, write a helper that checks if a candidate is feasible.",
      "Be explicit about lower bound versus upper bound behavior.",
    ],
    complexity:
      "gradient O(n), Binary O(log n), search-on-answer O(log range * check)",
    useCase:
      "Used in sorted arrays, optimization problems, allocation problems, and database-like lookup logic.",
    example: {
      problem: "Find the first index where arr[i] >= target.",
      input: "arr = [1, 2, 4, 4, 7], target = 4",
      output: "2",
      explanation:
        "Use lower-bound binary search. When arr[mid] is large enough, keep it as a possible answer and search left.",
    },
    pitfalls: [
      "Infinite loops caused by wrong boundary updates.",
      "Returning any occurrence when the problem asks for first or last occurrence.",
      "Using binary search when the predicate is not monotonic.",
    ],
    practice: [
      "Binary Search",
      "Search Insert Position",
      "Koko Eating Bananas",
    ],
    code: `int lowerBound(int[] arr, int target) {
  int left = 0;
  int right = arr.length;

  while (left < right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
  },
  {
    title: "Sorting",
    category: "Algorithmic Technique",
    difficulty: "Foundation",
    description:
      "Sorting organizes data and often unlocks greedy, two-pointer, binary-search, and interval solutions.",
    patterns: [
      "Merge Sort",
      "Quick Sort",
      "Custom Comparator",
      "Counting Sort",
    ],
    recognition: [
      "Relative order helps reveal pairs, intervals, duplicates, or greedy choices.",
      "The problem asks for ranking, merging, minimum removals, or lexicographic order.",
      "Input size allows O(n log n), or values allow counting sort.",
    ],
    approach: [
      "Choose the sort key carefully: start time, end time, value, frequency, or custom priority.",
      "After sorting, scan once to merge, count, or pick choices.",
      "For strings or objects, ensure comparator is transitive.",
      "Consider stable ordering only when the problem depends on original order.",
    ],
    complexity:
      "Common comparison sorting O(n log n); counting sort O(n + range)",
    useCase:
      "Used in ranking, scheduling, interval problems, deduplication, greedy preprocessing, and search optimization.",
    example: {
      problem: "Merge overlapping intervals.",
      input: "[[1,3], [2,6], [8,10], [15,18]]",
      output: "[[1,6], [8,10], [15,18]]",
      explanation:
        "Sort by start time. If the next interval starts before the current one ends, extend the current interval.",
    },
    pitfalls: [
      "Sorting by the wrong key for greedy interval problems.",
      "Integer overflow in comparator subtraction.",
      "Mutating input when the original order is still needed later.",
    ],
    practice: ["Merge Intervals", "Sort Colors", "Meeting Rooms"],
    code: `int[][] merge(int[][] intervals) {
  Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
  List<int[]> merged = new ArrayList<>();

  for (int[] current : intervals) {
    if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < current[0]) {
      merged.add(current);
    } else {
      int[] last = merged.get(merged.size() - 1);
      last[1] = Math.max(last[1], current[1]);
    }
  }
  return merged.toArray(new int[merged.size()][]);
}`,
  },
  {
    title: "Dynamic Programming",
    category: "Optimization Technique",
    difficulty: "Advanced",
    description:
      "Dynamic programming stores overlapping subproblem results and is useful when choices create repeated states.",
    patterns: ["Memoization", "Tabulation", "Knapsack", "LIS"],
    recognition: [
      "The problem asks for maximum, minimum, count, ways, or feasibility.",
      "A brute-force recursion repeats the same state many times.",
      "The current answer depends on smaller prefixes, indexes, capacities, or previous choices.",
    ],
    approach: [
      "Define the state clearly, for example dp[index], dp[index][capacity], or dp[row][col].",
      "Write the transition: how the current state is built from smaller states.",
      "Define base cases before filling the table.",
      "Choose memoization for easier recursion or tabulation for iterative control.",
    ],
    complexity: "Depends on number of states x transitions per state",
    useCase:
      "Used in optimization, counting, subsequences, paths, edit distance, knapsack, and decision-making problems.",
    example: {
      problem: "Minimum cost to climb stairs.",
      input: "cost = [10, 15, 20]",
      output: "15",
      explanation:
        "At each step, the minimum cost is its cost plus the minimum cost of reaching one or two steps before it.",
    },
    pitfalls: [
      "Choosing a state that does not contain enough information.",
      "Wrong base cases for index 0, index 1, or empty input.",
      "Using DP when a greedy proof is simpler and sufficient.",
    ],
    practice: [
      "Climbing Stairs",
      "House Robber",
      "Longest Increasing Subsequence",
    ],
    code: `int minCostClimbingStairs(int[] cost) {
  int prev2 = 0;
  int prev1 = 0;

  for (int i = 2; i <= cost.length; i++) {
    int takeOne = prev1 + cost[i - 1];
    int takeTwo = prev2 + cost[i - 2];
    int current = Math.min(takeOne, takeTwo);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
  },
  {
    title: "Greedy Algorithms",
    category: "Optimization Technique",
    difficulty: "Intermediate",
    description:
      "Greedy algorithms make the locally best choice when that choice can be proven to lead to a global optimum.",
    patterns: [
      "Intervals",
      "Sorting + Choice",
      "Priority Queue",
      "Min/Max Strategy",
    ],
    recognition: [
      "The problem asks for minimum resources, maximum count, earliest finish, or best immediate choice.",
      "Sorting reveals a natural choice order.",
      "A local decision can be proven with exchange argument or invariant.",
    ],
    approach: [
      "Sort by the property that makes the earliest safe decision possible.",
      "Maintain a compact state such as lastEnd, currentCapacity, or heap top.",
      "Prove why choosing locally does not block a better future answer.",
      "If no proof is visible, consider DP instead.",
    ],
    complexity: "Usually O(n log n) when sorting or priority queue is required",
    useCase:
      "Used in scheduling, activity selection, minimum platforms, resource allocation, and interval selection.",
    example: {
      problem: "Select the maximum number of non-overlapping meetings.",
      input: "meetings = [[1,3], [2,4], [3,5], [6,8]]",
      output: "3",
      explanation:
        "Sort by end time and always choose the meeting that finishes earliest. This leaves maximum room for future meetings.",
    },
    pitfalls: [
      "Sorting by start time when end time is the actual greedy key.",
      "Using greedy without a correctness argument.",
      "Ignoring equality rules for overlapping boundaries.",
    ],
    practice: [
      "Non-overlapping Intervals",
      "Jump Game",
      "Minimum Number of Arrows",
    ],
    code: `int maxMeetings(int[][] meetings) {
  Arrays.sort(meetings, (a, b) -> Integer.compare(a[1], b[1]));
  int count = 0;
  int lastEnd = Integer.MIN_VALUE;

  for (int[] meeting : meetings) {
    if (meeting[0] >= lastEnd) {
      count++;
      lastEnd = meeting[1];
    }
  }
  return count;
}`,
  },
  {
    title: "Backtracking",
    category: "Search Technique",
    difficulty: "Advanced",
    description:
      "Backtracking explores choices recursively and reverts decisions when a path cannot produce a valid solution.",
    patterns: ["Subsets", "Permutations", "N-Queens", "Constraint Search"],
    recognition: [
      "The task asks for all valid combinations, permutations, boards, paths, or configurations.",
      "Every step has multiple choices and invalid paths can be pruned.",
      "Output size itself may be exponential.",
    ],
    approach: [
      "Define the current path and the remaining choices.",
      "Add a choice, recurse, then remove the choice before trying the next one.",
      "Use pruning rules early to avoid impossible branches.",
      "Handle duplicates by sorting and skipping repeated choices at the same recursion level.",
    ],
    complexity: "Often exponential, based on branching factor and depth",
    useCase:
      "Used in puzzles, combinations, permutations, word search, Sudoku, N-Queens, and constraint-solving problems.",
    example: {
      problem: "Generate all subsets of [1, 2, 3].",
      input: "[1, 2, 3]",
      output: "[[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]",
      explanation:
        "For each index, choose either to include the value or skip it. This forms a binary decision tree.",
    },
    pitfalls: [
      "Forgetting to undo the choice after recursion.",
      "Adding the same mutable list reference to results.",
      "Not pruning invalid states early enough.",
    ],
    practice: ["Subsets", "Permutations", "N-Queens"],
    code: `void subsets(int index, int[] nums, List<Integer> path, List<List<Integer>> result) {
  if (index == nums.length) {
    result.add(new ArrayList<>(path));
    return;
  }

  path.add(nums[index]);
  subsets(index + 1, nums, path, result);

  path.remove(path.size() - 1);
  subsets(index + 1, nums, path, result);
}`,
  },
  {
    title: "Bit Manipulation",
    category: "Low-Level Technique",
    difficulty: "Intermediate",
    description:
      "Bit manipulation uses binary operations to optimize checks, masks, subsets, parity, and compact state representation.",
    patterns: ["XOR", "Bit Masks", "Set/Clear Bits", "Subset Enumeration"],
    recognition: [
      "The problem mentions bits, parity, masks, power of two, subsets, or toggles.",
      "Values can be represented as flags.",
      "XOR behavior can cancel duplicate values.",
    ],
    approach: [
      "Use AND to test a bit, OR to set a bit, XOR to toggle or cancel duplicates.",
      "Use n & (n - 1) to remove the lowest set bit.",
      "Represent subset states as masks when n is small.",
      "Be careful with signed integers and shift behavior.",
    ],
    complexity: "Often O(1) per operation; subset masks are O(2^n)",
    useCase:
      "Used in permissions, compression, parity checks, subset DP, feature flags, and optimization problems.",
    example: {
      problem:
        "Find the number that appears once when every other number appears twice.",
      input: "[4, 1, 2, 1, 2]",
      output: "4",
      explanation:
        "XOR cancels equal numbers because a ^ a = 0 and a ^ 0 = a. The remaining value is the unique number.",
    },
    pitfalls: [
      "Using addition where XOR cancellation is required.",
      "Forgetting operator precedence around bit checks.",
      "Overflow or sign issues with left shifts.",
    ],
    practice: ["Single Number", "Counting Bits", "Subsets Using Bitmask"],
    code: `int singleNumber(int[] nums) {
  int result = 0;
  for (int num : nums) {
    result ^= num;
  }
  return result;
}`,
  },
] as const;

export function dsaTopicSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const dsaTopicAliases: Record<string, string> = {
  "linked-list": "linked-lists",
  stack: "stacks",
  queue: "queues",
  greedy: "greedy-algorithms",
};

const supplementalTopicCatalog = [
  {
    title: "Hash Tables",
    category: "Lookup Structure",
    description:
      "Hash tables provide expected constant-time lookup, insertion, and duplicate detection for large key spaces.",
    patterns: ["Hashing", "Frequency Counting", "Deduplication", "Key Lookup"],
    useCase:
      "Used in caches, session stores, duplicate detection, indexing, routing maps, and constant-time membership checks.",
  },
  {
    title: "Binary Search Trees",
    category: "Ordered Tree Structure",
    description:
      "Binary search trees maintain ordered keys so range queries, predecessor lookup, and sorted traversal become natural operations.",
    patterns: ["Ordered Insert", "Inorder Traversal", "Range Query", "Balanced Search"],
    useCase:
      "Used in ordered dictionaries, ranking systems, interval search, and tree-backed indexes.",
  },
  {
    title: "AVL Trees",
    category: "Self-Balancing Tree",
    description:
      "AVL trees rebalance after inserts and deletes to preserve logarithmic search performance.",
    patterns: ["Rotations", "Height Balance", "Ordered Search", "Rebalancing"],
    useCase:
      "Used in systems that need deterministic balanced search trees with frequent updates.",
  },
  {
    title: "Heaps",
    category: "Priority Structure",
    description:
      "Heaps keep the smallest or largest item at the root, making repeated top-k and scheduling operations efficient.",
    patterns: ["Heapify", "Top K", "Streaming", "Priority Scheduling"],
    useCase:
      "Used in schedulers, top-k analytics, recommendation ranking, and streaming order statistics.",
  },
  {
    title: "Priority Queues",
    category: "Scheduling Structure",
    description:
      "Priority queues return the highest-priority item first and are the standard abstraction for schedulers and best-first search.",
    patterns: ["Top K", "Best First", "Task Scheduling", "Greedy Extraction"],
    useCase:
      "Used in job schedulers, recruiter ranking, Dijkstra, A*, and queue prioritization.",
  },
  {
    title: "Tries",
    category: "String Index",
    description:
      "Tries index strings by character prefix, supporting autocomplete, prefix search, and constrained dictionary traversal.",
    patterns: ["Prefix Search", "Autocomplete", "Dictionary Walk", "Lexicographic Search"],
    useCase:
      "Used in command palettes, search suggestions, dictionaries, and route completion systems.",
  },
  {
    title: "Divide & Conquer",
    category: "Problem Decomposition",
    description:
      "Divide and conquer splits a problem into smaller independent subproblems, solves them recursively, and combines the answers.",
    patterns: ["Recursive Split", "Merge", "Partition", "Subproblem Composition"],
    useCase:
      "Used in merge sort, quicksort, binary search, FFT-style decomposition, and recursive geometry problems.",
  },
  {
    title: "Sliding Window",
    category: "Range Optimization",
    description:
      "Sliding window maintains a moving subarray or substring so repeated range queries avoid full recomputation.",
    patterns: ["Fixed Window", "Variable Window", "Rolling Aggregate", "Window Validity"],
    useCase:
      "Used in rate limiting, analytics, substring search, rolling averages, and throughput calculations.",
  },
  {
    title: "Two Pointers",
    category: "Pointer Technique",
    description:
      "Two pointers exploit ordering or bidirectional scans to reduce nested loops into linear passes.",
    patterns: ["Converging Pointers", "Fast/Slow", "Partitioning", "Pair Search"],
    useCase:
      "Used in sorted pair search, cycle detection, partitioning, and in-place array transforms.",
  },
  {
    title: "Recursion",
    category: "Control Flow Technique",
    description:
      "Recursion expresses repeated self-similar work through smaller calls with explicit base cases.",
    patterns: ["Base Case", "Recursive Decomposition", "Backtracking", "Tree Traversal"],
    useCase:
      "Used in tree traversal, divide and conquer, parsing, backtracking, and hierarchical rendering.",
  },
  {
    title: "Segment Trees",
    category: "Range Query Structure",
    description:
      "Segment trees answer range queries and point updates efficiently by storing aggregated values over intervals.",
    patterns: ["Range Query", "Point Update", "Lazy Propagation", "Tree Aggregation"],
    useCase:
      "Used in analytics dashboards, interval updates, leaderboards, and heavy query workloads.",
  },
  {
    title: "Fenwick Trees",
    category: "Prefix Sum Structure",
    description:
      "Fenwick trees compress prefix-sum updates and queries into a lightweight logarithmic data structure.",
    patterns: ["Prefix Sum", "Point Update", "Low Bit", "Cumulative Query"],
    useCase:
      "Used in real-time analytics, frequency tables, inversion counts, and cumulative event tracking.",
  },
  {
    title: "Union Find",
    category: "Connectivity Structure",
    description:
      "Union Find tracks disjoint sets and quickly answers whether elements belong to the same connected component.",
    patterns: ["Disjoint Set", "Path Compression", "Union by Rank", "Connectivity Check"],
    useCase:
      "Used in graph connectivity, Kruskal MST, clustering, and dynamic grouping problems.",
  },
  {
    title: "Topological Sort",
    category: "Dependency Ordering",
    description:
      "Topological sort orders a DAG so every dependency appears before the node that depends on it.",
    patterns: ["Indegree Queue", "DAG Ordering", "Dependency Resolution", "Build Graph"],
    useCase:
      "Used in task scheduling, build systems, curriculum planning, and dependency resolution.",
  },
  {
    title: "Shortest Path",
    category: "Pathfinding",
    description:
      "Shortest-path algorithms compute the cheapest route between nodes under weighted or unweighted constraints.",
    patterns: ["BFS Shortest Path", "Dijkstra", "Relaxation", "Path Reconstruction"],
    useCase:
      "Used in routing, navigation graphs, dependency graphs, and network optimization.",
  },
  {
    title: "Network Flow",
    category: "Flow Optimization",
    description:
      "Network flow algorithms maximize throughput through a constrained graph using residual capacities and augmenting paths.",
    patterns: ["Residual Graph", "Augmenting Path", "Capacity", "Min Cut"],
    useCase:
      "Used in allocation, matching, bandwidth planning, and constrained scheduling systems.",
  },
  {
    title: "String Algorithms",
    category: "Text Processing",
    description:
      "String algorithms optimize substring matching, prefix analysis, pattern detection, and text indexing.",
    patterns: ["Prefix Function", "Pattern Match", "Rolling Hash", "Suffix Reasoning"],
    useCase:
      "Used in search engines, autocomplete, plagiarism checks, and syntax tooling.",
  },
  {
    title: "Sorting Algorithms",
    category: "Ordering Technique",
    description:
      "Sorting algorithms organize collections by one or more keys so later logic can scan, search, or merge efficiently.",
    patterns: ["Comparison Sort", "Partition", "Merge", "Stable Ordering"],
    useCase:
      "Used in ranking, feed ordering, scheduling, and analytics pre-processing.",
  },
  {
    title: "Searching Algorithms",
    category: "Retrieval Technique",
    description:
      "Searching algorithms locate exact, approximate, or feasible answers within ordered or indexed spaces.",
    patterns: ["Linear Scan", "Binary Search", "Search on Answer", "Index Lookup"],
    useCase:
      "Used in indexes, route lookup, configuration search, and API result retrieval.",
  },
  {
    title: "Caching Algorithms",
    category: "State Optimization",
    description:
      "Caching algorithms decide which data to retain or evict so repeated access becomes fast without exhausting memory.",
    patterns: ["LRU", "LFU", "Memoization", "Eviction Policy"],
    useCase:
      "Used in API response caching, chatbot reuse, database acceleration, and browser/runtime storage.",
  },
  {
    title: "Scheduling Algorithms",
    category: "Execution Planning",
    description:
      "Scheduling algorithms choose execution order under time, priority, and dependency constraints.",
    patterns: ["Priority Queue", "EDF", "Greedy Selection", "Dependency Scheduling"],
    useCase:
      "Used in job queues, background workers, animation priorities, and operating systems.",
  },
  {
    title: "Compression Algorithms",
    category: "Storage Optimization",
    description:
      "Compression algorithms reduce storage and transfer cost by encoding repeated or predictable data patterns efficiently.",
    patterns: ["Frequency Coding", "Dictionary Encoding", "Run Length", "Entropy Reduction"],
    useCase:
      "Used in media delivery, payload minimization, archival systems, and network transfer optimization.",
  },
] as const;

function splitComplexity(complexity: string) {
  const lower = complexity.toLowerCase();
  const space =
    lower.includes("space") || lower.includes("adjacency list")
      ? complexity
      : "Auxiliary space depends on the chosen implementation and input representation.";

  return {
    timeComplexity: complexity,
    spaceComplexity: space,
  };
}

type TopicSourceLike = {
  title: string;
  patterns: readonly string[];
  complexity: string;
  useCase: string;
  pitfalls: readonly string[];
  example: {
    problem: string;
    input: string;
    output: string;
    explanation: string;
  };
  practice: readonly string[];
  code: string;
  description: string;
};

function buildGenericCodeExamples(topic: TopicSourceLike) {
  const functionName = dsaTopicSlug(topic.title).replace(/-([a-z])/g, (_, char: string) =>
    char.toUpperCase(),
  );
  const summaryComment = topic.example.problem.replace(/"/g, '\\"');

  return [
    {
      language: "Java" as const,
      code: topic.code,
    },
    {
      language: "Python" as const,
      code: `def ${functionName}(data):
    """
    ${summaryComment}
    Pattern focus: ${topic.patterns.join(", ")}
    """
    # Translate the core steps from the Java reference implementation.
    # Start from the recognition cues, then apply the numbered approach.
    raise NotImplementedError("Use the Java reference above to complete the Python port.")`,
    },
    {
      language: "JavaScript" as const,
      code: `function ${functionName}(data) {
  // ${summaryComment}
  // Pattern focus: ${topic.patterns.join(", ")}
  // Translate the core steps from the Java reference implementation.
  throw new Error("Complete the JavaScript port from the Java reference.");
}`,
    },
    {
      language: "TypeScript" as const,
      code: `function ${functionName}<T>(data: T): T {
  // ${summaryComment}
  // Pattern focus: ${topic.patterns.join(", ")}
  // Translate the core steps from the Java reference implementation.
  throw new Error("Complete the TypeScript port from the Java reference.");
}`,
    },
  ];
}

function buildAdvantages(topic: TopicSourceLike) {
  return [
    `Strong fit for ${topic.patterns.slice(0, 2).join(" and ")} style problems.`,
    `Useful when interview constraints demand ${topic.complexity.toLowerCase()}.`,
    `Maps well to ${topic.useCase.replace(/^Used in /i, "").replace(/\.$/, "")}.`,
  ];
}

function buildDisadvantages(topic: TopicSourceLike) {
  return [
    ...topic.pitfalls.slice(0, 2),
    `Can be the wrong abstraction when the input does not match ${topic.title.toLowerCase()}-style constraints.`,
  ];
}

function buildInterviewQuestions(topic: TopicSourceLike) {
  return [
    `How would you recognize that ${topic.title} is the right tool for a problem like "${topic.example.problem}"?`,
    `What tradeoffs would make you reject a ${topic.title} solution in production?`,
    `How would you optimize or generalize the ${topic.patterns[0]} approach for larger inputs?`,
  ];
}

function buildFaangCompanies(topic: TopicSourceLike) {
  const normalized = `${topic.title} ${topic.useCase}`.toLowerCase();

  if (/(graph|path|network|dependency|route)/.test(normalized)) {
    return ["Google", "Meta", "Amazon", "Apple", "Netflix"];
  }

  if (/(cache|memory|linked list|queue|stack)/.test(normalized)) {
    return ["Amazon", "Meta", "Google", "Netflix", "Apple"];
  }

  if (/(tree|search|ranking|sort|heap)/.test(normalized)) {
    return ["Google", "Apple", "Amazon", "Meta", "Netflix"];
  }

  return ["Amazon", "Google", "Meta", "Apple", "Netflix"];
}

export const algorithmTopics: AlgorithmTopic[] = dsaTopics.map((topic) => {
  const { timeComplexity, spaceComplexity } = splitComplexity(topic.complexity);
  const productionUsage = topic.useCase
    .replace(/^Used in /i, "")
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean);

  return {
    title: topic.title,
    slug: dsaTopicSlug(topic.title),
    category: topic.category,
    difficulty: topic.difficulty,
    explanation: topic.description,
    visualExplanation: `${topic.title} problems are usually recognized through ${topic.patterns
      .slice(0, 3)
      .join(
        ", ",
      )}. Start by modeling the input, then trace how state changes after each operation.`,
    javaCode: topic.code,
    timeComplexity,
    spaceComplexity,
    useCases: productionUsage,
    relatedProblems: [...topic.practice],
    patterns: [...topic.patterns],
    recognition: [...topic.recognition],
    approach: [...topic.approach],
    example: topic.example,
    pitfalls: [...topic.pitfalls],
    advantages: buildAdvantages(topic),
    disadvantages: buildDisadvantages(topic),
    interviewQuestions: buildInterviewQuestions(topic),
    faangCompanies: buildFaangCompanies(topic),
    productionUsage,
    codeExamples: buildGenericCodeExamples(topic),
  };
});

const supplementalTopics: AlgorithmTopic[] = supplementalTopicCatalog.map((topic) => {
  const example = {
    problem: `Explain where ${topic.title} becomes a better choice than a naive scan.`,
    input: "Production constraints: large dataset, repeated queries, low latency",
    output: `${topic.title} selected for stronger asymptotic behavior`,
    explanation:
      `${topic.title} matters when repeated operations or structural constraints make naive iteration too slow or too costly to maintain.`,
  };

  const pseudoTopic = {
    title: topic.title,
    category: topic.category,
    difficulty:
      /(network flow|segment trees|fenwick trees|avl trees)/i.test(topic.title)
        ? "Advanced"
        : /(tries|priority queues|shortest path|union find|divide & conquer)/i.test(
              topic.title,
            )
          ? "Intermediate"
          : "Foundation",
    description: topic.description,
    patterns: topic.patterns,
    recognition: [
      `The problem naturally matches ${topic.patterns[0].toLowerCase()} style reasoning.`,
      "You need stronger lookup, ordering, range-query, or dependency performance than a brute-force loop provides.",
      "The same data will be queried, updated, or traversed repeatedly under time constraints.",
    ],
    approach: [
      `Model the problem around ${topic.title.toLowerCase()} rather than forcing a generic array scan.`,
      `Choose the right ${topic.patterns[0].toLowerCase()} invariant before implementing details.`,
      "Validate complexity, edge cases, and update/query behavior before finalizing the implementation.",
    ],
    complexity:
      /(hash tables|tries|caching algorithms)/i.test(topic.title)
        ? "Typical operations are O(1) to O(m) depending on key length and collision behavior."
        : /(priority queues|heaps|binary search trees|avl trees|union find|shortest path)/i.test(
              topic.title,
            )
          ? "Typical operations are O(log n) or near-constant amortized depending on balancing and path compression."
          : "Complexity depends on query/update shape, but the main goal is to beat repeated O(n) recomputation.",
    useCase: topic.useCase,
    example,
    pitfalls: [
      `Using ${topic.title.toLowerCase()} when a simpler structure would be clearer or cheaper.`,
      "Ignoring update/query tradeoffs and only optimizing one side of the workload.",
      "Forgetting edge cases around empty input, duplicate keys, or disconnected states.",
    ],
    practice: [
      `${topic.title} basics`,
      `${topic.title} production use case`,
      `${topic.title} optimization question`,
    ],
    code: `// Primary Java sketch for ${topic.title}
// Replace this with a full implementation for the exact interview or production problem.
class Main {
  public static void main(String[] args) {
    System.out.println("${topic.title} starter reference");
  }
}`,
  };
  const { timeComplexity, spaceComplexity } = splitComplexity(pseudoTopic.complexity);
  const productionUsage = topic.useCase
    .replace(/^Used in /i, "")
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean);

  return {
    title: pseudoTopic.title,
    slug: dsaTopicSlug(pseudoTopic.title),
    category: pseudoTopic.category,
    difficulty: pseudoTopic.difficulty,
    explanation: pseudoTopic.description,
    visualExplanation: `${pseudoTopic.title} is usually justified when ${pseudoTopic.patterns
      .slice(0, 3)
      .join(", ")} becomes more important than linear iteration.`,
    javaCode: pseudoTopic.code,
    timeComplexity,
    spaceComplexity,
    useCases: productionUsage,
    relatedProblems: [...pseudoTopic.practice],
    patterns: [...pseudoTopic.patterns],
    recognition: [...pseudoTopic.recognition],
    approach: [...pseudoTopic.approach],
    example: pseudoTopic.example,
    pitfalls: [...pseudoTopic.pitfalls],
    advantages: buildAdvantages(pseudoTopic),
    disadvantages: buildDisadvantages(pseudoTopic),
    interviewQuestions: buildInterviewQuestions(pseudoTopic),
    faangCompanies: buildFaangCompanies(pseudoTopic),
    productionUsage,
    codeExamples: buildGenericCodeExamples(pseudoTopic),
  };
});

export const allAlgorithmTopics = [...algorithmTopics, ...supplementalTopics];

export const dsaPracticeProblems: PracticeProblem[] = allAlgorithmTopics.flatMap(
  (topic) =>
    topic.relatedProblems.map((problem, index) => ({
      title: problem,
      topicSlug: topic.slug,
      difficulty: index === 0 ? "Easy" : index === 1 ? "Medium" : "Hard",
      pattern: topic.patterns[index % topic.patterns.length] ?? topic.title,
    })),
);

export function getAlgorithmTopicBySlug(slug: string) {
  const normalizedSlug = dsaTopicAliases[slug] ?? slug;

  return (
    allAlgorithmTopics.find((topic) => topic.slug === normalizedSlug) ??
    allAlgorithmTopics.find(
      (topic) =>
        topic.title.toLowerCase() === normalizedSlug.replaceAll("-", " "),
    ) ??
    null
  );
}
import type { AlgorithmTopic, PracticeProblem } from "@/types/dsa";
