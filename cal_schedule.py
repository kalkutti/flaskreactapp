from ortools.algorithms import pywrapknapsack_solver

solver = pywrapknapsack_solver.KnapsackSolver(
    pywrapknapsack_solver.KnapsackSolver.
    KNAPSACK_MULTIDIMENSION_BRANCH_AND_BOUND_SOLVER, 'KnapsackExample'
)

class calschedule:
    def generate(event_posts, cap):
        priceValues = []
        durationWgts = []
        
        for post in event_posts:
            priceValues.append(post.price)
            durationWgts.append(post.duration)

        solver.Init(priceValues, [durationWgts], [cap])
        computed_value = solver.Solve()

        schld_item = []

        for i in range(len(priceValues)):
            if solver.BestSolutionContains(i):
                schld_item.append(i)

        return schld_item
        
