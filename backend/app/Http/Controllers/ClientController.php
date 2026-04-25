<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::where('user_id', auth()->id())->latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'Clients retrieved successfully',
            'data' => $clients
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'telephone' => 'nullable|string|max:20',
                'adresse' => 'nullable|string',
            ]);

            $validated['user_id'] = auth()->id();
            $client = Client::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Client created successfully',
                'data' => $client
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function show(Client $client)
    {
        if ($client->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Client retrieved successfully',
            'data' => $client
        ]);
    }

    public function update(Request $request, Client $client)
    {
        if ($client->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        try {
            $validated = $request->validate([
                'nom' => 'sometimes|required|string|max:255',
                'email' => 'nullable|email|max:255',
                'telephone' => 'nullable|string|max:20',
                'adresse' => 'nullable|string',
            ]);

            $client->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Client updated successfully',
                'data' => $client
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function destroy(Client $client)
    {
        if ($client->user_id !== auth()->id()) {
            return response()->json(['success' => false, 'message' => 'Unauthorized', 'errors' => []], 403);
        }

        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully',
            'data' => null
        ], 200);
    }
}
