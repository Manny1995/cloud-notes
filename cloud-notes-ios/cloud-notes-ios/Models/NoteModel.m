//
//  NoteModel.m
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import "NoteModel.h"

@implementation NoteModel


- (NSString *) getExtension {
    
    return nil;
}

-(instancetype) initWithDictionary:(NSDictionary *)noteObject {
    self = [super init];
    
    self.title = [noteObject objectForKey:@"title"];
    
    NSString *fileString = [NSString stringWithFormat:@"http://notes.lilwizeguy.me/%@", [noteObject objectForKey:@"filepath"]];
    self.fileUrl = fileString;
    
    return self;
}

@end
