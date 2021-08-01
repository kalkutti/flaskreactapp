from collections import defaultdict
from linked_list import LinkedList

class Graph(object):
    """ Graph data structure, undirected by default. """

    def __init__(self, connections, directed=False):
        self._graph = defaultdict(LinkedList)
        self._directed = directed
        self.add_connections(connections)

    def add_connections(self, connections):
        """ Add connections (list of tuple pairs) to graph """

        for node1, node2 in connections:
            self.add(node1, node2)

    def add(self, node1, node2):
        """ Add connection between node1 and node2 """

        self._graph[node1].insert_at_end(node2)
        if not self._directed:
            self._graph[node2].insert_at_end(node1)

    def __str__(self):
        return '{}({})'.format(self.__class__.__name__, dict(self._graph))