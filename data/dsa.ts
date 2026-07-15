export const dsaStats = [
  { value: "500+", label: "Problems Solved" },
  { value: "200+", label: "LeetCode Problems" },
  { value: "150+", label: "Codeforces Problems" },
  { value: "Master", label: "DSA in Java" },
] as const;

export const dsaTopics = [
  {
    title: "Arrays",
    description:
      "Arrays store elements in contiguous memory and are the base for traversal, two pointers, prefix sums, and sliding window problems.",
    patterns: ["Traversal", "Two Pointers", "Prefix Sum", "Sliding Window"],
    complexity: "Access O(1), Search O(n), Insert/Delete O(n)",
    useCase: "Used in sorting, searching, DP tables, frequency counts, and most interview fundamentals.",
    code: `int[] arr = {1, 2, 3, 4, 5};
for (int value : arr) {
  System.out.println(value);
}`,
  },
  {
    title: "Linked List",
    description:
      "Linked lists connect nodes through references, making insertions flexible and pointer manipulation important.",
    patterns: ["Fast & Slow Pointers", "Reversal", "Merge Lists", "Cycle Detection"],
    complexity: "Access O(n), Search O(n), Insert/Delete O(1) with node reference",
    useCase: "Useful for understanding memory links, LRU caches, queues, and pointer-heavy interview problems.",
    code: `class Node {
  int val;
  Node next;
  Node(int val) { this.val = val; }
}

Node reverse(Node head) {
  Node prev = null;
  while (head != null) {
    Node next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}`,
  },
  {
    title: "Stack",
    description:
      "Stacks follow LIFO order and are strong for parsing, undo operations, recursion simulation, and monotonic patterns.",
    patterns: ["Monotonic Stack", "Expression Parsing", "Backtracking", "Next Greater Element"],
    complexity: "Push O(1), Pop O(1), Peek O(1)",
    useCase: "Used in browser history, function calls, balanced parentheses, and stock span problems.",
    code: `Stack<Character> stack = new Stack<>();
for (char ch : s.toCharArray()) {
  if (ch == '(') stack.push(ch);
  else if (ch == ')' && !stack.isEmpty()) stack.pop();
}
boolean balanced = stack.isEmpty();`,
  },
  {
    title: "Queue",
    description:
      "Queues follow FIFO order and are essential for BFS, scheduling, streaming, and level-order processing.",
    patterns: ["BFS", "Level Order", "Sliding Window Queue", "Topological Processing"],
    complexity: "Enqueue O(1), Dequeue O(1), Peek O(1)",
    useCase: "Used in graph traversal, task scheduling, request processing, and tree level-order traversal.",
    code: `Queue<Integer> queue = new LinkedList<>();
queue.offer(1);
queue.offer(2);
while (!queue.isEmpty()) {
  int current = queue.poll();
  System.out.println(current);
}`,
  },
  {
    title: "Trees",
    description:
      "Trees represent hierarchy and recursive relationships. Binary trees, BSTs, and heaps appear frequently in interviews.",
    patterns: ["DFS", "BFS", "Recursion", "Lowest Common Ancestor"],
    complexity: "Traversal O(n), Balanced BST search O(log n)",
    useCase: "Used in file systems, DOM structure, search indexes, heaps, and hierarchical data.",
    code: `void inorder(TreeNode root) {
  if (root == null) return;
  inorder(root.left);
  System.out.println(root.val);
  inorder(root.right);
}`,
  },
  {
    title: "Graphs",
    description:
      "Graphs model relationships between nodes. They are key for networks, dependency resolution, routes, and connectivity.",
    patterns: ["BFS", "DFS", "Shortest Path", "Topological Sort"],
    complexity: "Traversal O(V + E)",
    useCase: "Used in maps, social networks, recommendation systems, dependency graphs, and pathfinding.",
    code: `void dfs(int node, boolean[] seen, List<List<Integer>> graph) {
  seen[node] = true;
  for (int next : graph.get(node)) {
    if (!seen[next]) dfs(next, seen, graph);
  }
}`,
  },
  {
    title: "Searching",
    description:
      "Searching finds target values efficiently. Binary search is especially important when the answer space is sorted or monotonic.",
    patterns: ["Linear Search", "Binary Search", "Search on Answer", "Lower Bound"],
    complexity: "Linear O(n), Binary O(log n)",
    useCase: "Used in sorted arrays, optimization problems, allocation problems, and database-like lookup logic.",
    code: `int binarySearch(int[] arr, int target) {
  int left = 0, right = arr.length - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  },
  {
    title: "Sorting",
    description:
      "Sorting organizes data and often unlocks greedy, two-pointer, and binary-search solutions.",
    patterns: ["Merge Sort", "Quick Sort", "Custom Comparator", "Counting Sort"],
    complexity: "Common comparison sorting O(n log n)",
    useCase: "Used in ranking, scheduling, interval problems, deduplication, and preprocessing.",
    code: `Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
for (int[] interval : intervals) {
  System.out.println(interval[0] + \" - \" + interval[1]);
}`,
  },
  {
    title: "Dynamic Programming",
    description:
      "Dynamic programming stores overlapping subproblem results and is useful when choices create repeated states.",
    patterns: ["Memoization", "Tabulation", "Knapsack", "LIS"],
    complexity: "Depends on states × transitions",
    useCase: "Used in optimization, counting, subsequences, paths, and decision-making problems.",
    code: `int fib(int n, int[] dp) {
  if (n <= 1) return n;
  if (dp[n] != -1) return dp[n];
  return dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
}`,
  },
  {
    title: "Greedy",
    description:
      "Greedy algorithms make the locally best choice when that choice can be proven to lead to a global optimum.",
    patterns: ["Intervals", "Sorting + Choice", "Priority Queue", "Min/Max Strategy"],
    complexity: "Usually O(n log n) when sorting is required",
    useCase: "Used in scheduling, activity selection, minimum platforms, and resource allocation.",
    code: `Arrays.sort(tasks, (a, b) -> a.end - b.end);
int count = 0, lastEnd = -1;
for (Task task : tasks) {
  if (task.start >= lastEnd) {
    count++;
    lastEnd = task.end;
  }
}`,
  },
  {
    title: "Backtracking",
    description:
      "Backtracking explores choices recursively and reverts decisions when a path cannot produce a valid solution.",
    patterns: ["Subsets", "Permutations", "N-Queens", "Constraint Search"],
    complexity: "Often exponential, based on branching choices",
    useCase: "Used in puzzles, combinations, permutations, and constraint-solving problems.",
    code: `void subsets(int index, int[] nums, List<Integer> path) {
  if (index == nums.length) {
    System.out.println(path);
    return;
  }
  path.add(nums[index]);
  subsets(index + 1, nums, path);
  path.remove(path.size() - 1);
  subsets(index + 1, nums, path);
}`,
  },
  {
    title: "Bit Manipulation",
    description:
      "Bit manipulation uses binary operations to optimize checks, masks, subsets, and parity-related problems.",
    patterns: ["XOR", "Bit Masks", "Set/Clear Bits", "Subset Enumeration"],
    complexity: "Often O(1) per operation",
    useCase: "Used in permissions, compression, parity checks, subset states, and optimization problems.",
    code: `int singleNumber(int[] nums) {
  int result = 0;
  for (int num : nums) {
    result ^= num;
  }
  return result;
}`,
  },
] as const;
