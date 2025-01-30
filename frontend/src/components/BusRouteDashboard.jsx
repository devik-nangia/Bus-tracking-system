import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Map } from 'lucide-react';
import { useRoutesStore } from "../api/useRoutesStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from "react-router"

const BusRouteDashboard = () => {
  const { getRoutes, setRoutes, routes, occupiedCapacity, deleteRoute, updateRoute, activeRoute, setActiveRoute } = useRoutesStore();

  useEffect(() => {
    setRoutes();
  }, [setRoutes, getRoutes, deleteRoute, updateRoute]);

  //console.log(routes);

  const sortedRoutes = [...routes].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  });

  const toggleActivity = (route) => {
    let newStatus
    if (route.status === "active") {
      newStatus = "inactive"
    } else {
      newStatus = "active"
    }
    updateRoute(route.id, {
      id: route.id,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      busCapacity: route.busCapacity,
      busOccupants: route.busOccupants,
      status: newStatus
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bus Route Management</h1>
        <Link to="/add-route">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add New Route
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {routes.filter(route => route.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {routes.reduce((sum, route) => sum + route.busCapacity, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Passengers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {occupiedCapacity}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Start Location</TableHead>
                <TableHead>End Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRoutes.map(route => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell>{route.startLocation}</TableCell>
                  <TableCell>{route.endLocation}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${route.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {route.status}
                    </span>
                  </TableCell>
                  <TableCell>{route.busCapacity}</TableCell>
                  <TableCell>
                    {route.busOccupants}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => toggleActivity(route)}>
                        make {" "}
                        {route.status === "active" ? "inactive" : "active"}
                      </Button>
                      <Link to="/route-map">
                        <Button variant="outline" size="icon" onClick={() => setActiveRoute(route)}>
                          <Map size={16} />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600"
                        onClick={() => deleteRoute(route.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusRouteDashboard;
