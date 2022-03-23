# Problem 1
You have been given 2 unusually durable PS5’s. You are in an office building that is 100 stories high. Using the fewest possible number of drops from windows in your office building, determine the highest floor you can drop a PS5 from and have it survive. For example, they might be able to take the drop from the 30th floor, but not the 31st. You can break both PS5s in your search. State the worst case number of drops needed and explain how you arrived at that answer.

# Solution
### Time
40 mins
### Answer
The worst case number of drops needed is <i>14</i>.
Because 1 + 2 + 3 + ... + 14 = 105(>100)
### Solution
We can find it as following method.

```
s = 1, n=m, m:answer
```
Step1: Drop first PS5 at floor n.

Step2: If first one breaks, start dropping second PS5 from s to n - 1.
    You can find answer at least within n times.

Step3: If first one not breaks, s = s + n, n = n + (m - 1), m = m - 1.
     Then go to step 1

The least m that satisfies 1 + 2 + ... + m > BUILDING_STORIES(100) is the answer. BUILDING_STORIES can be any number.

Example:

In this case, building is 100 stories so answer is m = 14.

We can test first PS5 at following stories.
14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99...



