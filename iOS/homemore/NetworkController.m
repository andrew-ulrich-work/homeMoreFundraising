//
//  NetworkController.m
//  homemore
//
//  Created by Ken Zheng on 10/22/16.
//  Copyright © 2016 1904Labs. All rights reserved.
//

#import "NetworkController.h"
#import "AtRisk.h"
#import "Story.h"

@implementation NetworkController

+(id) sharedInstance {
    static NetworkController *_sharedInstance = nil;
    static dispatch_once_t oncePredicate;
    
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[NetworkController alloc] init];
    });
    
    return _sharedInstance;
}


- (instancetype)init
{
    if (self = [super init])
    {
        
    }
    return self;
}

- (void)configureRestKit
{
#if DEBUG
    RKLogConfigureByName("RestKit/ObjectMapping", RKLogLevelTrace);
    RKLogConfigureByName("RestKit/Network", RKLogLevelTrace);
#endif
    NSURL *baseURL = [NSURL URLWithString:@"https://pacific-beach-41748.herokuapp.com"];
    RKObjectManager *objectManager = [RKObjectManager managerWithBaseURL:baseURL];
    [RKObjectManager setSharedManager:objectManager];
    
    
    
//    self.managedObjectStore = [[RKManagedObjectStore alloc] initWithManagedObjectModel:managedObjectModel];
//    objectManager.managedObjectStore = self.managedObjectStore;
//    
//
//    [self.managedObjectStore createPersistentStoreCoordinator];
//    NSString *storePath = [RKApplicationDataDirectory() stringByAppendingPathComponent:@"MyCoreData.sqlite"];
//    NSString *seedPath = [[NSBundle mainBundle] pathForResource:@"MyCoreData" ofType:@"sqlite"];
//    NSError *error;
//    NSPersistentStore *persistentStore = nil;
//    persistentStore = [self.managedObjectStore addSQLitePersistentStoreAtPath:storePath fromSeedDatabaseAtPath:seedPath withConfiguration:nil options:nil error:&error];
//    NSAssert(persistentStore, @"Failed to add persistent store with error: %@", error);
//    
//    // Create the managed object contexts
//    [self.managedObjectStore createManagedObjectContexts];
//    
//    // Configure a managed object cache to ensure we do not create duplicate objects
//    self.managedObjectStore.managedObjectCache = [[RKInMemoryManagedObjectCache alloc] initWithManagedObjectContext:self.managedObjectStore.persistentStoreManagedObjectContext];
//    
//    [RKManagedObjectStore setDefaultStore:self.managedObjectStore];
    [RKObjectManager setSharedManager:objectManager];
    objectManager.requestSerializationMIMEType = RKMIMETypeJSON;
    [RKMIMETypeSerialization registerClass:[RKNSJSONSerialization class] forMIMEType:@"text/html"];
    
    [self setupDescriptors];
}


-(void) setupDescriptors {
    RKObjectMapping *storyMapping = [RKObjectMapping mappingForClass:[Story class]];
    [storyMapping addAttributeMappingsFromArray:@[@"text", @"amountRaised", @"amountNeeded", @"dueDate", @"title"]];
    
    RKObjectMapping *atRiskMapping = [RKObjectMapping mappingForClass:[AtRisk class]];
    [atRiskMapping addAttributeMappingsFromDictionary:@{@"_id": @"_id",
                                                        @"fakeName": @"fakeName",
                                                        @"description": @"desc",
                                                        @"followers": @"followers"}];
    [atRiskMapping addPropertyMapping:[RKRelationshipMapping relationshipMappingFromKeyPath:@"stories" toKeyPath:@"stories" withMapping:storyMapping]];
    
    // register mappings with the provider using a response descriptor
    RKResponseDescriptor *responseDescriptor =
    [RKResponseDescriptor responseDescriptorWithMapping:atRiskMapping
                                                 method:RKRequestMethodGET
                                            pathPattern:@"/atRisk"
                                                keyPath:nil
                                            statusCodes:[NSIndexSet indexSetWithIndex:200]];
    
    [[RKObjectManager sharedManager] addResponseDescriptor:responseDescriptor];
    
}

- (void)tearDownRestKit
{
    // Cancel any network operations and clear the cache
    [[RKObjectManager sharedManager].operationQueue cancelAllOperations];
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
    
    // Cancel any object mapping in the response mapping queue
    [[RKObjectRequestOperation responseMappingQueue] cancelAllOperations];
    
    // Ensure the existing defaultStore is shut down
    [[NSNotificationCenter defaultCenter] removeObserver:[RKManagedObjectStore defaultStore]];
    
    [RKObjectManager setSharedManager:nil];
    [RKManagedObjectStore setDefaultStore:nil];
}



@end
